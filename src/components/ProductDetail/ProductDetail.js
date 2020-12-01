import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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
            if (isAdded !== undefined) {
                setShowAdd(false);
            }
            else {
                setShowAdd(true);
            }
        }
    }, [product.key])


    const addProduct = (e, key) => {
        const updatedCart = [...cart, product];
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        NotificationManager.success('You have added a artwork to your cart', 'Success!', 3000);
        e.target.style.display = 'none';
    }


    return (
        <main className='container py-5 my-5'>
            <NotificationContainer />
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
                    {
                        showAdd ? <button onClick={(e) => addProduct(e, product.key)} className='btn btn-success'>Add To Cart</button>
                            : <button onClick={() => history.goBack()} className='btn btn-secondary disabled'>Already Added</button>
                    }
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;