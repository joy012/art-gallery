/* eslint-disable import/no-cycle */
import React from 'react';
import Collection from './Collections/Collection';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import ImageSlider from './ImageSlider/ImageSlider';
import Services from './Services/Services';

const Home = () => (
    <div>
        <ImageSlider />
        <Services />
        <Collection />
        <Contact />
        <Footer />
    </div>
);

export default Home;
