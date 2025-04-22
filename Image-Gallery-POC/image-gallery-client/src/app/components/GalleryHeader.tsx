'use client';
import React from 'react';

interface GalleryHeaderProps {
    selectedCount: number;
    totalSize: number;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    onSubmit: () => void;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({ selectedCount, totalSize, onSelectAll, onDeselectAll, onSubmit }) => {
    return (
        <div className="card card-primary" id="gallery-card">
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <p id="counter">Selected: {selectedCount}</p>
                        <p id="size">Total Size: {totalSize} bytes</p>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-block btn-primary btn-sm" onClick={onSelectAll}>
                            Select All Images
                        </button>
                        <button type="button" className="btn btn-block btn-primary btn-sm" onClick={onDeselectAll}>
                            Deselect All Images
                        </button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-block btn-primary btn-sm" onClick={onSubmit}>
                            Submit Selected Images
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(GalleryHeader);
