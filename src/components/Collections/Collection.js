import React from 'react';
import './Collection.css';
import data from '../../DataBase';

const Collection = () => {
    return (
        <div className='container pt-5 mb-5'>
            <h1 className='text-center mb-2 pb-4'>Our Collections</h1>
            <div className="row align-items-center justify-content-center">
                {
                    data.map(collection =>
                        <div className="col-lg-3 col-md-4 col-6 mb-5-card">
                            <div class="collection-card card w-100">
                                <div className="card-body">
                                    <img class="card-img-top" src={collection.image} alt="" />
                                </div>
                                <div class="card-footer">
                                    <h6 className='text-center card-title'>{collection.name || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}</h6>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default Collection;