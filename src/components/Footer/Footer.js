import React from 'react';

const Footer = () => {
    return (
        <div>
            <p className='font-weight-bold text-center py-2 m-0'>&copy; Tonu's Creation {new Date().getFullYear()}, All rights reserved.</p>
        </div>
    );
};

export default Footer;