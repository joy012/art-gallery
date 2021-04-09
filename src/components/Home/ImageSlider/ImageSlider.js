/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import './ImageSlider.css';
import Slider from "react-slick";
import { UserContext } from '../../../App';

const ImageSlider = () => {
    // const [products, setProducts] = useState([]);
    
    // useEffect(() => {
    //     fetch('http://localhost:1812/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             sessionStorage.setItem('databaseProduct', JSON.parse(data))
    //             setProducts(data)
    //         })
    // }, [])

    // if (sessionStorage.getItem('databaseProduct') !== null) {
    //     setProducts(JSON.parse(sessionStorage.getItem('databaseProduct')))
    // }

    const [, , , , , , , , , , databaseData ] = useContext(UserContext);

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
            <div className="pb-4" >
                <h1 className="text-center pb-5">Welcome To <span style={{ color: '#7AB259' }}>Tonu's Creation</span></h1>
                <Slider {...settings}>
                    {
                        databaseData.map(product =>
                            <div key={product?._id} className='px-3 img-container'>
                                <img className='w-100' src={`data:image/png;base64,${product?.image.img}`} alt="" />
                            </div>
                        )
                    }

                </Slider>
            </div>
        </section>
    );
};

export default ImageSlider;