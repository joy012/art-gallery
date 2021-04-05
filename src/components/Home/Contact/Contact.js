import React from 'react';
import ContactForm from './ContactForm/ContactForm';

const Contact = () => {
    return (
        <section style={{ background: '#ebf3fd' }} className='px-5'>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-5 mb-2">
                        <h2>Let's Stay in touch</h2>
                    </div>
                    <div className="col-md-7">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;