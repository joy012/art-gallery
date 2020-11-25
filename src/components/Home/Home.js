import React from 'react';
import Collection from './Collections/Collection';
import Contact from './Contact/Contact';
import ImageSlider from './ImageSlider/ImageSlider';
import Services from './Services/Services';

const Home = () => {
    return (
        <div>
            <ImageSlider />
            <Services />
            <Collection />
            <Contact />
        </div>
    );
};

export default Home;