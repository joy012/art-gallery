/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Slider from "react-slick";
import { UserContext } from '../../../App';
import './ImageSlider.css';

const ImageSlider = () => {
    const [, , , , , , , , , , databaseData] = useContext(UserContext);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        speed: 500,
        arrows: true,
        autoplay: true,
        dots: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="px-5 container margin-top rounded my-5">
            {
                databaseData.length === 0 ?
                    <div className='text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

                    :
                    <div className="pb-4" >
                        <h1 className="text-center pb-5">Welcome To <span style={{ color: '#7AB259' }}>Tonu's Creation</span></h1>
                        <Slider {...settings}>
                            {
                                databaseData.map(product =>
                                    <div key={product?._id} className='px-3 img-container'>
                                        <img className='w-100' src={product?.img} alt="" />
                                    </div>
                                )
                            }

                        </Slider>
                    </div>
            }
        </section>
    );
};

export default ImageSlider;