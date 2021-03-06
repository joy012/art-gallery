import React from 'react';
import Particles from 'react-particles-js';
import Typical from 'react-typical';
import './About.css';
import dp from './dp.jpg';

const About = () => (
    <section className="background py-2 container">
        <Particles
            params={{
                particles: {
                    number: {
                        value: 200,
                        density: {
                            enable: false,
                        },
                    },
                    size: {
                        value: 9,
                        random: true,
                    },
                    move: {
                        direction: 'top',
                        out_mode: 'out',
                    },
                    line_linked: {
                        enable: false,
                    },
                },
                interactivity: {
                    events: {
                        onclick: {
                            enable: true,
                            mode: 'remove',
                        },
                    },
                    modes: {
                        remove: {
                            particles_nb: 3,
                        },
                    },
                },
            }}
        />
        <img src={dp} className="dp mx-auto d-block rounded-circle py-3" alt="" />
        <h2 className="text-center" style={{ color: '#01c9ad' }}>
            Jannatul Ferdous Tonny
        </h2>
        <Typical
            className="text-center text-white h4 mb-3"
            steps={['Artist', 3500, 'Entrepreneur', 3500, 'Medical Student', 3500]}
            loop={Infinity}
            wrapper="p"
        />
        <p className="text-white text-center pt-3 w-75 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium minus dignissimos
            sunt suscipit enim animi velit repudiandae dolores optio soluta iste cum cupiditate
            ipsam ex, ea, fugiat aperiam illum debitis incidunt. Exercitationem veniam obcaecati
            perferendis repudiandae dolor sint eaque a mollitia, dolorum voluptatibus tenetur natus,
            ipsam praesentium officia cumque? Quas?
        </p>
    </section>
);

export default About;
