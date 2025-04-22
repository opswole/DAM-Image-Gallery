import { useCallback } from 'react';
import Link from 'next/link';

const Navbar = () => {
 
    return (
        <nav className={"main-header navbar navbar-expand navbar-white navbar-light"}>
            <ul className="navbar-nav">
                
                <li className="nav-item d-none d-sm-inline-block">
                    <Link href="/Image-Gallery-POC/image-gallery-client/public" className="nav-link">
                        home
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link href="/cloudinary" className="nav-link">
                        cloudinary
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link href="/thirdlight" className="nav-link">
                        thirdlight
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
