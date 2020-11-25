import React from 'react';
import { Link, useParams } from 'react-router-dom';
import data from '../../DataBase';
import Bounce from 'react-reveal/Bounce';

const Products = () => {
    const param = useParams();
    return (
        <main>
            <h1 className='text-capitalize text-center py-5'>{param.name}</h1>
            <div className="container">
                <div className="row">
                    {
                        data.map(product =>
                            <Bounce top duration={3000}>

                                <div className="col-lg-3 col-md-4 col-6 mb-4 collection-card">
                                    <Link to={`/productDetail/${product.key}`}>
                                        <div className="card w-100">
                                            <div className="card-body">
                                                <img className="card-img-top" src={product.image} alt="" />
                                            </div>
                                            <div className="card-footer">
                                                <h6 className='text-center card-title'>{product.name || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}</h6>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Bounce>

                        )
                    }
                </div>
            </div>
        </main>
    );
};

export default Products;