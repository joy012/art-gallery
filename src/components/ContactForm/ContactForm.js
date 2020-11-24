import React from 'react';

const ContactForm = () => {
    const handleSubmit = e => {
        e.target.reset();
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Your email address" />
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Your name/ company's name" />
            </div>
            <div class="form-group">
                <textarea class="form-control"  rows="8" placeholder="Your message..."></textarea>
            </div>
            <input type='submit' className='btn btn-dark px-5 d-block ml-md-auto mx-auto mx-md-0' value='Send'/>
        </form>
    );
};

export default ContactForm;