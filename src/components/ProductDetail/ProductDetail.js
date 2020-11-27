import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import data from '../../DataBase';

const ProductDetail = () => {
    const { key } = useParams()
    const [product, setProduct] = useState({});
    const [,,,,cart, setCart] = useContext(UserContext);
    const [showAdd, setShowAdd] = useState(true);

    useEffect(() => {
        setProduct(data.find(pd => pd.key === key))
    }, [key])

    // if(product.key){
    //     const isAdded = cart.find(pd => pd.key === product.key);
    //     if(isAdded.key){
    //         setShowAdd(false);
    //     }
    //     else{
    //         setShowAdd(false);
    //     }
    // }

    const addProduct = (e,key) => {
        const updatedCart = [...cart, product];
        sessionStorage.setItem('cart', updatedCart);
        setCart(updatedCart);
    }

    return (
        <main className='container py-5 my-5'>
            <div className="row align-items-center justify-content-center">
                <div class="col-md-6 col-md-offset">
                    <img src={product.image} className='w-75 d-block mx-auto' alt="" />
                </div>
                <div class="col-md-5">
                    <h2 className='my-3'>{product.name}</h2>
                    <h4>BDT {product.price}</h4>
                    <div className='my-4'>
                        <h5 className='mb-2'>Painting Details:</h5>
                        <p className='mb-2'> Paper:  </p>
                        <p className='mb-2'> Size Without Frame: </p>
                        <p> Size With Frame: </p>
                    </div>
                    <div className='my-3'>
                        <h5 className='mb-2'>Frame Details:</h5>
                        <p className='mb-2'>Material: </p>
                        <p>Color: </p>
                        
                    </div>
                    <div class="alert alert-danger" role="alert">
                        <h6>Price may vary depending on Frame size</h6>
                    </div>
                    {
                        showAdd? <button onClick={(e) => addProduct(e,product.key)} className='btn btn-success'>Add To Cart</button>
                        : <button className='btn btn-secondary disabled'>Add To Cart</button>
                    }
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;