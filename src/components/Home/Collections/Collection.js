import React from 'react';
import Bounce from 'react-reveal/Bounce';
import './Collection.css';
import data from '../../../DataBase/index';
import { Link } from 'react-router-dom';


const Collection = () => {

    return (
        <main className='container pt-5 mb-5'>
            <h1 className='text-center mb-2 pb-4'>Trending Now</h1>
            <div className="row align-items-center justify-content-center">
                {
                    data.map(collection =>
                        <Bounce right duration={3000}>
                            <div className="col-lg-3 col-md-4 col-6 mb-4 collection-card">
                                <Link to={`/productDetail/${collection.key}`}>
                                        <div className="card w-100">
                                            <div className="card-body">
                                                <img className="card-img-top" src={collection.image} alt="" />
                                            </div>
                                            <div className="card-footer">
                                                <h6 className='text-center card-title'>{collection.name || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}</h6>
                                            </div>
                                        </div>
                                </Link>
                            </div>
                        </Bounce>
                    )
                }
            </div>

        </main>
    );
};

export default Collection;