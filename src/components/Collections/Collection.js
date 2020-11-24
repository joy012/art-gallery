import React from 'react';
import Bounce from 'react-reveal/Bounce';
import './Collection.css';
import data from '../../DataBase';

const Collection = () => {
    return (
        <div className='container pt-5 mb-5'>
            <h1 className='text-center mb-2 pb-4'>Trending Now</h1>
            <div className="row align-items-center justify-content-center">
                {
                    data.map(collection =>
                        <Bounce top>
                            <div className="col-lg-3 col-md-4 col-6 mb-4 collection-card">
                                <div class="card w-100">
                                    <div className="card-body">
                                        <img class="card-img-top" src={collection.image} alt="" />
                                    </div>
                                    <div class="card-footer">
                                        <h6 className='text-center card-title'>{collection.name || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}</h6>
                                    </div>
                                </div>
                            </div>
                        </Bounce>
                    )
                }
            </div>

        </div>
    );
};

export default Collection;