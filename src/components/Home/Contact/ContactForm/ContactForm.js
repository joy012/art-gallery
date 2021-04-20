import emailjs, { init } from 'emailjs-com';
import React, { useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

init('user_541YLqgHK4Edya8LvhMAY');

const ContactForm = () => {
  const [senderInfo, setSenderInfo] = useState({});

  const handleChange = (e) => {
    const updateInfo = { ...senderInfo };
    updateInfo[e.target.name] = e.target.value;
    setSenderInfo(updateInfo);
  };

  const handleSubmit = (e) => {
    emailjs.send('service_51pxusi', 'template_b4swtfc', senderInfo).then(
      function (response) {
        store.addNotification({
          title: "Your Message Has Been Sent!",
          message: "We will contact you soon",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        });
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );
    e.target.reset();
    e.preventDefault();
  };

  return (
    <>
      <ReactNotification />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input onChange={handleChange} type="text" name='email' className="form-control" placeholder="Your email address" />
        </div>
        <div className="form-group">
          <input onChange={handleChange} type="text" name='name' className="form-control" placeholder="Your name/ company's name" />
        </div>
        <div className="form-group">
          <textarea onChange={handleChange} className="form-control" name='message' rows="5" placeholder="Your message..."></textarea>
        </div>
        <input type='submit' className='btn btn-success px-5 d-block ml-md-auto mx-auto mx-md-0' value='Send' />
      </form>
    </>
  );
};

export default ContactForm;