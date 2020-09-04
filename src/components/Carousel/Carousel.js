import React, { useState } from 'react';
import './Carousel.css'
import data from '../../DataBase'

const Carousel = () => {
    const banner = data.slice(0, 5);
    const [arts, setArts] = useState(banner);

    return (
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner">
            {
                arts.map(art => 
                <div class="carousel-item active">
                <   img src={art.image} class="d-block mx-auto" alt="..."/>
                </div>
                )
            }
        </div>
        <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    );
};

export default Carousel;