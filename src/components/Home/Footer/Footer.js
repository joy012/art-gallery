/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const location = useLocation();
    const isLocation = location.pathname === '/about';
    return (
        <footer className="d-flex flex-column align-items-center pt-3 footer-bg">
            {!isLocation && (
                <>
                    <div className="icons">
                        <h5 className="text-center">Follow Us On</h5>
                        <ul>
                            <li>
                                <a
                                    href="https://www.facebook.com/tonnyyyyyyyyyyyy"
                                    target="_blank"
                                />
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/_t_o_n_u_s_creation/"
                                    target="_blank"
                                />
                            </li>
                        </ul>
                    </div>
                    <h6 className="text-center">
                        &copy; Tonu's Creation {new Date().getFullYear()}. All right reserved
                    </h6>
                </>
            )}
        </footer>
    );
};

export default Footer;
