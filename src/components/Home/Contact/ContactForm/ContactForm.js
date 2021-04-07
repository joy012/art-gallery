import React, { useState } from 'react';
import emailjs, { init } from 'emailjs-com';

init('user_541YLqgHK4Edya8LvhMAY');

const ContactForm = () => {
    const [senderInfo, setSenderInfo] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleBlur = (e) => {
        const updateInfo = { ...senderInfo };
        updateInfo[e.target.name] = e.target.value;
        setSenderInfo(updateInfo);
      };
    
      const handleSubmit = (e) => {
        emailjs.send('service_51pxusi', 'template_b4swtfc', senderInfo).then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text);
          },
          function (error) {
            console.log('FAILED...', error);
          }
        );
        e.target.reset();
        e.preventDefault();
      };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input onBlur={handleBlur} type="text" className="form-control" placeholder="Your email address" />
            </div>
            <div className="form-group">
                <input onBlur={handleBlur} type="text" className="form-control" placeholder="Your name/ company's name" />
            </div>
            <div className="form-group">
                <textarea onBlur={handleBlur} className="form-control"  rows="8" placeholder="Your message..."></textarea>
            </div>
            <input type='submit' className='btn btn-success px-5 d-block ml-md-auto mx-auto mx-md-0' value='Send'/>
        </form>
    );
};

export default ContactForm;