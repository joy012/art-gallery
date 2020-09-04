import React, { useState } from 'react';
import './Carousel.css'
import data from '../../DataBase'

const Carousel = () => {
    const firstBanner = data[0];
    console.log(firstBanner)
    const banner = data.slice(1, 6);
    const [arts, setArts] = useState(banner);
    console.log(arts);


    return (
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-slide-to="0" class="active"></li>
                {
                    arts.map((art, index) =>
                        <li data-slide-to={index}></li>)
                }
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <   img src={firstBanner.image} class="d-block mx-auto" alt="..." />
                </div>
                {
                    arts.map(art =>
                        <div class="carousel-item">
                            <   img src={art.image} class="d-block mx-auto" alt="..." />
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