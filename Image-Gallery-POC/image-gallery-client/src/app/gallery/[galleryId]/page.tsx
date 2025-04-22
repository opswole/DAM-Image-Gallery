'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Welcome, Response } from '@/app/interfaces/thirdlightInterface';
import { CloudinaryRoot, Resource } from '@/app/interfaces/cloudinaryInterface';
import axios from 'axios';
import Gallery from '@/app/components/Gallery';
import GalleryHeader from '@/app/components/GalleryHeader';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

const GalleryHome = () => {
    const galleryId = useParams().galleryId;
    const source = useSearchParams().get('source');
    const [thirdlightData, setThirdlightData] = useState<Response[]>([]);
    const [cloudinaryData, setCloudinaryData] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number>(0);
    const [lightboxSlides, setLightboxSlides] = useState<{ src: string; alt: string; title: string; description: string }[]>([]);
    const [selectedImages, setSelectedImages] = useState<Map<string, { url: string; size: number }>>(new Map());

    useEffect(() => {
        async function fetchData() {
            let response = null;
            if (source === null) {
                throw new Error('Source is not provided');
            }
            try {
                if (source === 'thirdlight') {
                    response = await fetch(`http://localhost:5282/ThirdLight/${galleryId}`);
                    if (!response.ok) {
                        throw new Error('Thirdlight response was not ok');
                    }
                    const result: Welcome = await response.json();
                    setThirdlightData(result.response);
                    const slides = result.response.map((item) => ({
                        src: item.thumbnails.large.url,
                        alt: item.filename,
                        title: item.filename,
                        description: `Image ID: ${item.id}`,
                    }));
                    setLightboxSlides(slides);
                    setLoading(false);
                } else {
                    response = await fetch(`http://localhost:5282/Cloudinary/${galleryId}`);
                    if (!response.ok) {
                        throw new Error('Cloudinary response was not ok');
                    }
                    const result: CloudinaryRoot = await response.json();
                    setCloudinaryData(result.resources);
                    const slides = result.resources.map((item) => ({
                        src: item.url,
                        alt: item.filename,
                        title: item.filename,
                        description: `Image ID: ${item.public_id}`,
                    }));
                    setLightboxSlides(slides);
                    setLoading(false);
                }
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        }

        fetchData();
    }, [galleryId, source]);

    const handleImageClick = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleImageSelect = useCallback((filename: string, url: string, size: number) => {
        setSelectedImages(prevSelectedImages => {
            const updatedImages = new Map(prevSelectedImages);
            if (updatedImages.has(filename)) {
                updatedImages.delete(filename);
            } else {
                updatedImages.set(filename, { url, size });
            }
            return updatedImages;
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        const allImages = new Map<string, { url: string; size: number }>();
        thirdlightData.forEach(item => {
            allImages.set(item.filename, { url: item.thumbnails.large.url, size: item.fileSizeBytes });
        });
        cloudinaryData.forEach(item => {
            allImages.set(item.filename, { url: item.url, size: item.bytes });
        });
        setSelectedImages(allImages);
    }, [thirdlightData, cloudinaryData]);

    const handleDeselectAll = useCallback(() => {
        setSelectedImages(new Map());
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            const imageUrls = Array.from(selectedImages.entries()).map(([name, { url }]) => ({ name, url }));

            const response = await axios.post('http://localhost:5282/api/ImageProcessing/process-images', imageUrls, {
                responseType: 'blob',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'images.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading images:', error);
        }
    }, [selectedImages]);

    const selectedCount = useMemo(() => selectedImages.size, [selectedImages]);
    const totalSize = useMemo(() => Array.from(selectedImages.values()).reduce((acc, { size }) => acc + size, 0), [selectedImages]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h3>Gallery: {source === 'cloudinary' ? decodeURIComponent(galleryId as string) : galleryId}</h3>
            <GalleryHeader
                selectedCount={selectedCount}
                totalSize={totalSize}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onSubmit={handleSubmit}
            />
            <div className="row">
                {thirdlightData && thirdlightData.map((item, index) => (
                    <Gallery
                        key={index}
                        filename={item.filename}
                        url={item.thumbnails.large.url}
                        imageid={item.id}
                        filesize={item.fileSizeBytes}
                        onClick={() => handleImageClick(index)}
                        onSelect={() => handleImageSelect(item.filename, item.thumbnails.large.url, item.fileSizeBytes)}
                        isSelected={selectedImages.has(item.filename)}
                    />
                ))}
                {cloudinaryData && cloudinaryData.map((item, index) => (
                    <Gallery
                        key={index}
                        filename={item.filename}
                        url={item.url}
                        imageid={item.public_id}
                        filesize={item.bytes}
                        onClick={() => handleImageClick(index + thirdlightData.length)} // Ensure unique index
                        onSelect={() => handleImageSelect(item.filename, item.url, item.bytes)}
                        isSelected={selectedImages.has(item.filename)}
                    />
                ))}
            </div>
            <Lightbox
                plugins={[Captions]}
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxSlides}
                index={lightboxIndex}
            />
        </div>
    );
};

export default GalleryHome;
