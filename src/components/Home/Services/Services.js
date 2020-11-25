import React from 'react';
import services from '../../../DataBase/services';
import Flip from 'react-reveal/Flip';
import './Services.css';

const Services = () => {
    return (
        <section className='py-5 my-5'>
            <h2 className='text-center py-5'>Our Services</h2>
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    {
                        services.map(service =>
                            <div class="col-md-4 col-6 service-card my-3">
                                <Flip top duration={2500}>
                                    <div class="card">
                                        <div class="card-body p-5">
                                            <img src={service.image} className='rounded-circle d-block service-logo mx-auto my-3' alt="" />
                                            <h5 class="card-title">{service.name}</h5>
                                            <p class="card-text">{service.details}</p>
                                        </div>
                                    </div>
                                </Flip>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Services;