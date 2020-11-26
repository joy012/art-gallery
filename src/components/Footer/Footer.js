import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const location = useLocation();
    const isLocation = location.pathname === '/home' || location.pathname === '/'
    return (
        <footer className={`subscribe d-flex flex-column align-items-center pt-3 ${isLocation? 'footer-bg' : ''}`}>
            <div className="icons">
                <h5 className="text-center">Follow Us On</h5>
                <ul>
                    <li><a href="https://www.facebook.com/" target="_blank"></a></li>
                    <li><a href="https://www.instagram.com/" target="_blank"></a></li>
                </ul>
            </div>
            <h6 className="text-center">&copy; Tonu's Creation {new Date().getFullYear()}. All right reserved</h6>
        </footer>
    );
};

export default Footer;