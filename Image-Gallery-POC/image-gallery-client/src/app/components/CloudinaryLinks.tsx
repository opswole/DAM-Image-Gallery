'use client';

import React from 'react';
import Link from 'next/link';

interface CloudinaryLink {
    name: string;
    link: string;
    source: string;
}

const links: CloudinaryLink[] = [
    { name: 'Pleated Roomsets', link: 'Arena/Pleated/Roomsets', source: 'cloudinary' },
    { name: 'Roller Roomsets', link: 'Arena/Roller/Roomsets', source: 'cloudinary' },
    { name: 'Roller Scans', link: 'Arena/Roller/Scans', source: 'cloudinary' },
    { name: 'Wooden', link: 'Arena/Wooden', source: 'cloudinary' },
];

const CloudinaryLinks: React.FC = () => {
    return (
        <div>
            <h3>Cloudinary</h3>
            <div className="container-fluid">
                <div className="row">
                    {links.map((link) => (
                        <div className="col-lg-3 col-6" key={link.link}>
                            <Link className="small-box bg-info"
                                  href={`/gallery/${encodeURIComponent(link.link)}?source=${link.source}`}
                                  passHref>
                                <div className="small-box-footer">
                                    {link.name} <i className="fas fa-arrow-circle-right"/>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CloudinaryLinks;
