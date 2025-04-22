import React from "react";

export interface ImageDetails {
    Name: string;
    Url: string;
    size: number;
}

export function handleImageClick(
    filename: string,
    url: string,
    size: number,
    selectedImages: Map<string, ImageDetails>,
    setSelectedImages: React.Dispatch<React.SetStateAction<Map<string, ImageDetails>>>
) {
    setSelectedImages(prevSelectedImages => {
        const updatedImages = new Map(prevSelectedImages);
        if (updatedImages.has(filename)) {
            updatedImages.delete(filename);
        } else {
            updatedImages.set(filename, { Name: filename, Url: url, size });
        }
        return updatedImages;
    });
}

export function selectAllImages(
    data: ImageDetails[],
    setSelectedImages: React.Dispatch<React.SetStateAction<Map<string, ImageDetails>>>
) {
    const allImages = new Map<string, ImageDetails>();
    data.forEach(item => {
        allImages.set(item.Name, { Name: item.Name, Url: item.Url, size: item.size });
    });
    setSelectedImages(allImages);
}

export function deselectAllImages(
    setSelectedImages: React.Dispatch<React.SetStateAction<Map<string, ImageDetails>>>
) {
    setSelectedImages(new Map());
}

export async function handleDownload(
    url: string,
    filename: string,
    selectedImages: Map<string, ImageDetails>
) {
    const imageArray = Array.from(selectedImages.values()).map(({ Name, Url }) => ({ Name, Url }));

    console.time(filename);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageArray),
        });
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Images.zip";
        link.click();
        console.timeEnd(filename);
    } catch (error) {
        console.error('Error:', error);
    }
}
