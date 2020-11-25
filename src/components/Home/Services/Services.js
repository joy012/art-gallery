import React from 'react';
import services from '../../../DataBase/services';

const Services = () => {
    return (
        <section>
            <h2 className='text-center py-4'>What We Provide</h2>
            {
                services.map(service =>
                    <div class="card h-100">
                        <div class="card-body">
                            <img src={service.map} className='d-block img-fluid' alt="" />
                            <h5 class="card-title">{service.name}</h5>
                            <p class="card-text">{service.details}</p>
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default Services;