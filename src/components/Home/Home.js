import React from 'react';
import Collection from '../Collections/Collection';
import Contact from '../Contact/Contact';
import ImageSlider from '../ImageSlider/ImageSlider';

const Home = () => {
    return (
        <div>
            <ImageSlider/>
            <Collection/>
            <Contact/>
        </div>
    );
};

export default Home;