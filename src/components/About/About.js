import React from 'react';
import dp from './dp.jpg'
import './About.css'
import Typical from 'react-typical';
import ParticlesContainer from './ParticlesContainer';

const About = () => {
    return (
        <section className='background py-5'>
            <img src={dp} className='dp mx-auto d-block rounded-circle py-5' alt="" />
            <Typical
                className="text-center text-white h2 mb-3"
                steps={['Artist', 3500, 'Entrepreneur', 3500, 'Medical Student', 3500]}
                loop={Infinity}
                wrapper="p"
            />
            <p className="text-white text-center p-5 lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium minus dignissimos sunt suscipit enim animi velit repudiandae dolores optio soluta iste cum cupiditate ipsam ex, ea, fugiat aperiam illum debitis incidunt. Exercitationem veniam obcaecati perferendis repudiandae dolor sint eaque a mollitia, dolorum voluptatibus tenetur natus, ipsam praesentium officia cumque? Quas?</p>
            <ParticlesContainer />
        </section>
    );
};

export default About;