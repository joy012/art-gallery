import React from 'react';
import Collection from '../Collections/Collection';
import ImageSlider from '../ImageSlider/ImageSlider';
import Subscribe from '../Subscribe/Subscribe';

const Home = () => {
    return (
        <div>
            <ImageSlider/>
            <Collection/>
            <Subscribe/>
        </div>
    );
};

export default Home;