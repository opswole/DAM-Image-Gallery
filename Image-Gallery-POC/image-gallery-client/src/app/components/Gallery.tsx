'use client';
import React from 'react';
import { lazyload } from 'react-lazyload';

interface GalleryProps {
    filename: string;
    url: string;
    imageid: string;
    filesize: number;
    onClick: () => void;
    onSelect: () => void;
    isSelected: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ filename, url, imageid, filesize, onClick, onSelect, isSelected }) => {
    return (
        <div className="col-md-3">
            <div className="card image-card mb-2">
                <div className="card-body">
                    <div className="parent">
                        <div className="child">
                            <img
                                className="card-img-top gallery-image"
                                alt={filename}
                                data-src={url}
                                src={url}
                                data-size={filesize}
                                style={{cursor: 'pointer'}}
                                onClick={onSelect}
                            />
                            <a onClick={onClick} className="view-full-image">
                                View Full Image
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
