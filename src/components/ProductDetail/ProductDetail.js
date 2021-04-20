import React, { useContext, useEffect, useState } from 'react';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Footer from '../Home/Footer/Footer';

const ProductDetail = () => {
    const { id } = useParams()
    const history = useHistory();
    const [loggedInUser, , , , , , , , , , databaseData] = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [, , , , cart, setCart] = useContext(UserContext);
    const [showAdd, setShowAdd] = useState(true);


    useEffect(() => {
        const productDetail = databaseData.find(pd => pd?._id === id)
        sessionStorage.setItem('productDetail', JSON.stringify(productDetail))
        setProduct(JSON.parse(sessionStorage.getItem('productDetail')));
    }, [databaseData, id])

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem('cart'));
        let isAdded;
        if (savedCart?.length) {
            setCart(savedCart);
            isAdded = savedCart.find(pd => {
                if (pd?._id === product?._id) {
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


    const addProduct = e => {
        sessionStorage.removeItem('productDetail')
        let updatedCart;
        if (cart?.length) {
            updatedCart = [...cart, { ...product }];
        }
        else {
            updatedCart = [{ ...product }]
        }

        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        setShowAdd(false);
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
    }


    return (
        <>
            <ReactNotification />
            <main className='container py-5'>
                <div className="row align-items-center justify-content-center">

                    <div className="col-lg-7 col-md-offset">
                        <img src={product?.img} draggable="false" className='not-draggable w-75 d-block mx-auto' alt="" />
                    </div>

                    <div className="col-lg-5">
                        <h2 className='my-3 text-danger text-center text-lg-left'>{product?.name}</h2>
                        <h3 className='text-success text-center text-lg-left'><span className='h1 font-weight-bold text-success'>৳</span>{product?.price}</h3>

                        <div className="w-75 mx-auto mx-lg-0 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label className='h6 font-weight-bold'>ArtWork:</label>
                            <h6 className='mb-0'>{product?.artType}</h6>
                        </div>

                        <div className="w-75 mx-auto mx-lg-0 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label className='h6 font-weight-bold'>Paper:</label>
                            <h6 className='mb-0'>{product?.paper}</h6>
                        </div>

                        <div className='my-4'>
                            <h5 className='mb-2 w-75 mx-auto mx-lg-0'>Frame Details</h5>

                            <h6 className='w-75 mx-auto mx-lg-0 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Material:</span> Fiber Stick</h6>

                            <h6 className='w-75 mx-auto mx-lg-0 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Color:</span> Black</h6>

                            <div className="w-75 mx-auto mx-lg-0 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label className='h6 font-weight-bold'>Size: </label>
                                <h6 className='mb-0'>{product?.size}</h6>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h5 className='mb-2 w-75 mx-auto mx-lg-0'>Inside Border:</h5>

                            <div className="w-75 mx-auto mx-lg-0 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label className='h6 font-weight-bold'>Color: </label>
                                <h6 className='mb-0'>{product?.borderSize}</h6>
                            </div>

                            <div className="w-75 mx-auto mx-lg-0 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label className='h6 font-weight-bold'>Size: </label>
                                <h6 className='mb-0'>{product?.borderColor}</h6>
                            </div>
                        </div>

                        {
                            showAdd & loggedInUser?.role !== 'admin' ?
                                <button onClick={addProduct} className='btn btn-success d-block w-50 mx-auto mx-lg-0'>Add To Cart</button>
                                : loggedInUser?.role !== 'admin' ?
                                    <>
                                        <h5 className='text-danger font-weight-bold text-center text-lg-left'>Added to Cart</h5>
                                        <button onClick={() => history.push('/cart')} className='btn btn-primary d-block w-50 mx-auto mx-lg-0'>Go To Cart</button>
                                    </>
                                    : <h4 className='text-danger text-center text-lg-left'>You are viewing as an admin!</h4>
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;