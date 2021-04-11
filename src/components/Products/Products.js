/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import Footer from '../Home/Footer/Footer';
import { UserContext } from '../../App';

const Products = () => {
    const { name }  = useParams();
    const [, , , , , , , , , , databaseData] = useContext(UserContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = databaseData.filter(data => (data.artType).toLowerCase() === name);
        setProducts(getProducts)
    },[databaseData, name])
    
    
    return (
        <>
            <main className='cart mt-3'>
                <h1 className='text-capitalize text-center py-5'>{name}</h1>
                <div className="container pb-5">
                    <div className="row">
                        {
                            products.map(product =>
                                <Bounce top duration={3000}>

                                    <div className="col-lg-3 col-md-4 col-6 mb-5 collection-card">
                                        <Link to={`/productDetail/${product?._id}`}>
                                            <div className="card w-100">
                                                <div className="card-body">
                                                    <img className="card-img-top" src={`data:image/png;base64,${product?.image?.img}`} alt="" />
                                                </div>
                                                <div className="card-footer">
                                                    <h5 className='text-center card-title'>{product?.name}</h5>
                                                    <h4 className='text-center text-success'><span className='h1 font-weight-bold text-success'>৳</span>{product?.price}</h4>
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