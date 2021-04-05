import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import data from '../../DataBase';

const ProductDetail = () => {
    const { key } = useParams()
    const history = useHistory();
    const [product, setProduct] = useState({});
    const [, , , , cart, setCart, orderDetail, setOrderDetail] = useContext(UserContext);
    const [showAdd, setShowAdd] = useState(true);

    useEffect(() => {
        setProduct(data.find(pd => pd.name === key))
    }, [key])

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem('cart'));
        let isAdded;
        console.log(savedCart)
        if (savedCart) {
            isAdded = savedCart.find(pd => pd.name === product.name);
            if (isAdded) {
                setShowAdd(false);
            }
            else {
                setShowAdd(true);
            }
        }
        else {
            setShowAdd(true);
        }
    }, [product.name])

    const handleChange = (e) => {
        const updatedDetail = {...orderDetail};
        updatedDetail[e.target.name] = e.target.value;
        setOrderDetail(updatedDetail)
    }

    const addProduct = e => {
        const updatedCart = [...cart, product];
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        store.addNotification({
            title: "Success!",
            message: "Artwork successfully added to your cart",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
        e.target.style.display = 'none';
        setTimeout(() => {
            history.push('/')
        }, 3500)
    }


    return (
        <>
            <ReactNotification />
            <main className='container py-5'>
                <div className="row align-items-center justify-content-center">

                    <div class="col-md-6 col-md-offset">
                        <img src={product.image} className='w-75 d-block mx-auto' alt="" />
                    </div>

                    <div class="col-md-5">
                        <h2 className='my-3'>{product.name}</h2>
                        <h3>BDT {product.price}</h3>

                        <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label for="exampleFormControlSelect0" className='h4 font-weight-bold'>Paper:</label>
                            <select onChange={handleChange} name='paper' class="form-control w-50" id="exampleFormControlSelect0">
                                <option>Art Paper</option>
                                <option>Canvas Paper</option>
                            </select>
                        </div>

                        <div className='my-4'>
                            <h4 className='mb-2 font-weight-bold'>Frame Details</h4>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Material:</span> Fiber Stick</h6>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Color:</span> Black</h6>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect1" className='h6 font-weight-bold'>Size: </label>
                                <select onChange={handleChange} name='frameSize' class="form-control w-50" id="exampleFormControlSelect1">
                                    <option>12 inch X 16 inch</option>
                                    <option>10 inch X 14 inch</option>
                                    <option>8 inch X 12 inch</option>
                                </select>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h4>Inside Border:</h4>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect2" className='h6 font-weight-bold'>Color: </label>
                                <select onChange={handleChange} name='borderColor' class="form-control w-50" id="exampleFormControlSelect2">
                                    <option>Black</option>
                                    <option>White</option>
                                </select>
                            </div>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect3" className='h6 font-weight-bold'>Size: </label>
                                <select onChange={handleChange} name='borderSize' class="form-control w-50" id="exampleFormControlSelect3">
                                    <option>No border</option>
                                    <option>0.5 inch</option>
                                    <option>1 inch</option>
                                </select>
                            </div>
                        </div>

                        {
                            showAdd ? <button onClick={addProduct} className='btn btn-success'>Add To Cart</button>
                                : <button onClick={() => history.goBack()} className='btn btn-secondary disabled'>Already Added</button>
                        }
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductDetail;