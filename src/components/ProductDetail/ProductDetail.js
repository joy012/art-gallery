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
    const [detail, setDetail] = useState({})
    const [, , , , cart, setCart] = useContext(UserContext);
    const [showAdd, setShowAdd] = useState(true);


    useEffect(() => {
        const productDetail = data.find(pd => pd.key === key)
        sessionStorage.setItem('productDetail', JSON.stringify(productDetail))
        setProduct(JSON.parse(sessionStorage.getItem('productDetail')));
    }, [key])

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem('cart'));
        let isAdded;
        if (savedCart?.length) {
            setCart(savedCart);
            isAdded = savedCart.find(pd => {
                if (pd.name === product?.name) {
                    return true;
                }
                else {
                    return false;
                }
            });

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
    }, [product, setCart])

    const handleChange = (e) => {
        const updatedDetail = { ...detail }
        updatedDetail[e.target.name] = e.target.value;
        setDetail(updatedDetail)
    }


    const addProduct = e => {
        sessionStorage.removeItem('productDetail')
        let updatedCart;
        if (cart?.length) {
            updatedCart = [...cart, { ...detail, ...product }];
        }
        else {
            updatedCart = [{ ...detail, ...product }]
        }

        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        e.target.style.display = 'none';
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
        setTimeout(() => {
            history.push('/');
        }, 3000)
    }


    return (
        <>
            <ReactNotification />
            <main className='container py-5'>
                <div className="row align-items-center justify-content-center">

                    <div class="col-md-6 col-md-offset">
                        <img src={product?.image} className='w-75 d-block mx-auto' alt="" />
                    </div>

                    <div class="col-md-5">
                        <h2 className='my-3 text-success'>{product?.name}</h2>
                        <h3 className='text-danger'>BDT {product?.price}</h3>

                        <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label for="exampleFormControlSelect0" className='h4 font-weight-bold'>Paper:</label>
                            <select onChange={handleChange} name='paper' class="form-control w-50" id="exampleFormControlSelect0" required>
                                <option value='' disabled selected></option>
                                <option value='Art Paper'>Art Paper</option>
                                <option value='Canvas Paper'>Canvas Paper</option>
                            </select>
                        </div>

                        <div className='my-4'>
                            <h4 className='mb-3 font-weight-bold'>Frame Details</h4>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Material:</span> Fiber Stick</h6>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Color:</span> Black</h6>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect1" className='h6 font-weight-bold'>Size: </label>
                                <select onChange={handleChange} name='frameSize' class="form-control w-50" id="exampleFormControlSelect1" required>
                                    <option value='' disabled selected></option>
                                    <option value='12 inch X 16 inch'>12 inch X 16 inch</option>
                                    <option value='10 inch X 14 inch'>10 inch X 14 inch</option>
                                    <option value='8 inch X 12 inch'>8 inch X 12 inch</option>
                                </select>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h4>Inside Border:</h4>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect2" className='h6 font-weight-bold'>Color: </label>
                                <select onChange={handleChange} name='borderColor' class="form-control w-50" id="exampleFormControlSelect2" required>
                                    <option value='' disabled selected></option>
                                    <option value='Black'>Black</option>
                                    <option value='White'>White</option>
                                </select>
                            </div>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect3" className='h6 font-weight-bold'>Size: </label>
                                <select onChange={handleChange} name='borderSize' class="form-control w-50" id="exampleFormControlSelect3" required>
                                    <option value='' disabled selected></option>
                                    <option value='NO border'>No border</option>
                                    <option value='0.5 inch'>0.5 inch</option>
                                    <option value='1 inch'>1 inch</option>
                                </select>
                            </div>
                        </div>

                        {
                            showAdd && detail.frameSize && detail.borderSize && detail.borderColor ? <button onClick={addProduct} className='btn btn-success'>Add To Cart</button>
                                : !showAdd ?
                                    <button onClick={() => history.goBack()} className='btn btn-outline-danger disabled'>Already Added</button>
                                    : <button className='btn btn-secondary disabled'>Select Details</button>
                        }
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductDetail;