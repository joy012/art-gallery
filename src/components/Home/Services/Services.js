import React from 'react';
import services from '../../../DataBase/services';
import Zoom from 'react-reveal/Zoom';
import './Services.css';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <section className='py-5 my-5'>
            <h2 className='text-center py-5'>Our Services</h2>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    {
                        services.map(service =>
                            <div className="col-md-4 col-6 my-3">
                                <Zoom right duration={2600}>
                                <Link to={`/products/${service.name.toLocaleLowerCase()}`}>
                                    <div className="card">
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