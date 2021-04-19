import React from 'react';
import services from '../../../DataBase/services';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import './Services.css';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <section id='service' className='py-4 my-5'>
            <Bounce right duration={1500}>
                <h2 className='text-center pt-2'>ArtWork Type</h2>
            </Bounce>
            <div className="container">
                <div className="row justify-content-center align-items-center py-4">
                    {
                        services.map(service =>
                            <div key={service.name} className="col-lg-3 col-6 my-4">
                                <Zoom right duration={2000}>
                                    <Link to={`/products/${service.name.toLocaleLowerCase()}`}>
                                        <div className="card h-100 card-bg">
                                            <div className="card-body service-card">
                                                <img src={service.image} className='rounded-circle d-block service-logo mx-auto my-3' alt="" />
                                                <h4 className="card-title">{service.name}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                </Zoom>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Services;