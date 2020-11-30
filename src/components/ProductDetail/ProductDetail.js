import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import data from '../../DataBase';

const ProductDetail = () => {
    const { key } = useParams()
    const history = useHistory();
    const [product, setProduct] = useState({});
    const [, , , , cart, setCart] = useContext(UserContext);
    const [showAdd, setShowAdd] = useState(true);

    useEffect(() => {
        setProduct(data.find(pd => pd.key === key))
    }, [key])

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem('cart'));
        let isAdded;
        if (savedCart) {
            isAdded = savedCart.find(pd => pd.key === product.key);
            console.log(isAdded)
            if (isAdded !== undefined) {
                setShowAdd(false);
            }
            else {
                setShowAdd(true);
            }
        }

    }, [product.key,showAdd])


    const addProduct = (key) => {
        const updatedCart = [...cart, product];
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        alert('You have add a produt in cart');
        history.goBack();
    }

    const warning = () => {
        alert('You have already added this in your cart');
        window.location.reload();
        history.goBack();
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
                        showAdd ? <button onClick={() => addProduct(product.key)} className='btn btn-success'>Add To Cart</button>
                            : <button onClick={warning} className='btn btn-secondary disabled'>Add To Cart</button>
                    }
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;