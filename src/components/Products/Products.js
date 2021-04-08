import React from 'react';
import { Link, useParams } from 'react-router-dom';
import data from '../../DataBase';
import Bounce from 'react-reveal/Bounce';
import Footer from '../Home/Footer/Footer';

const Products = () => {
    const param = useParams();
    return (
        <>
            <main className='mt-3'>
                <h1 className='text-capitalize text-center py-5'>{param.name}</h1>
                <div className="container pb-5">
                    <div className="row">
                        {
                            data.map(product =>
                                <Bounce top duration={3000}>

                                    <div className="col-lg-3 col-md-4 col-6 mb-5 collection-card">
                                        <Link to={`/productDetail/${product.key}`}>
                                            <div className="card w-100">
                                                <div className="card-body">
                                                    <img className="card-img-top" src={product.image} alt="" />
                                                </div>
                                                <div className="card-footer">
                                                    <h5 className='text-center card-title'>{product.name}</h5>
                                                    <h6 className='text-center'>BDT {product.price}</h6>
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
            <Footer />
        </>
    );
};

export default Products;