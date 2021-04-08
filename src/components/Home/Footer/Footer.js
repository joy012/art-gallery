/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Slide from 'react-reveal/Bounce';
import './Footer.css';

const Footer = () => {
    const location = useLocation();
    const isLocation = location.pathname === '/about';
    return (
        <Slide right duration={1000}>
            <footer className='d-flex flex-column align-items-center pt-3 footer-bg'>
                {
                    !isLocation &&
                    <>
                        <div className="icons">
                            <h5 className="text-center">Follow Us On</h5>
                            <ul>
                                <li><a href="https://www.facebook.com/" target="_blank"></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank"></a></li>
                            </ul>
                        </div>
                        <h6 className="text-center">&copy; Tonu's Creation {new Date().getFullYear()}. All right reserved</h6>
                    </>
                }
            </footer>
        </Slide>
    );
};

export default Footer;