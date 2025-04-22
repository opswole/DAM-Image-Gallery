'use client';

import React, {useState} from 'react';
import Link from "next/link";

interface ThirdlightLink {
    name: string;
    link: string;
    source: string
}

const links: ThirdlightLink[] = [
    { name: 'Verticals', link: '7fb2e577-bf8b-48e9-829b-5458221a1967', source: 'thirdlight' },
    { name: 'Roller Swatches', link: 'dd8f098b-70d7-4937-bdf9-4210b0980046', source: 'thirdlight' },
    { name: 'Softs', link: 'e014bba4-279a-42b6-a47c-1b5e47a7d984', source: 'thirdlight' },
    { name: 'Motorised', link: 'e5e06f8b-d223-48e4-ad15-0fb07eef3', source: 'thirdlight' },
]
const ThirdlightLinks: React.FC = () => {
    return (
        <div>
            <h3>Thirdlight</h3>
            <div className="container-fluid">
                <div className="row">
                    {links.map((link) => (
                        <div className="col-lg-3 col-6" key={link.link}>
                            <Link className="small-box bg-info" href={`/gallery/${link.link}?source=${link.source}`} passHref>
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

export default ThirdlightLinks;