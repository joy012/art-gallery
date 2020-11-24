import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="subscribe d-flex flex-column align-items-center">
            <div className="icons py-2">
                <h5 className="text-center">Follow Us On:</h5>
                <ul>
                    <li><a href="https://www.facebook.com/" target="_blank"></a></li>
                    <li><a href="https://www.instagram.com/" target="_blank"></a></li>
                </ul>
            </div>
            <h6 className="text-center">&copy; Tonu's Creation {new Date().getFullYear()}. All right reserved</h6>
        </div>
    );
};

export default Footer;