import React from 'react';
import Slide from 'react-reveal/Bounce';
import ContactForm from './ContactForm/ContactForm';

const Contact = () => {
    return (
        <section style={{ background: '#ebf3fd' }} className='px-5'>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <Slide left duration={3000}>
                        <div className="col-md-5 mb-2">
                            <h2>Get in touch to discuss about your custom Artwork</h2>
                        </div>
                    </Slide>
                    <div className="col-md-7">
                        <Slide right duration={3000}>
                            <ContactForm />
                        </Slide>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;