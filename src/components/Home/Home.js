import React from 'react';
import Collection from './Collections/Collection';
import Contact from './Contact/Contact';
import ImageSlider from './ImageSlider/ImageSlider';
import Services from './Services/Services';
import Footer from './Footer/Footer'

const Home = () => {
    return (
        <div>
            <ImageSlider />
            <Services />
            <Collection />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;