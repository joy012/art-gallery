import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { store } from 'react-notifications-component';
import InnerImageZoom from 'react-inner-image-zoom';
import Footer from '../Home/Footer/Footer';

const ProductDetail = () => {
    const { id } = useParams()
    const history = useHistory();
    const [loggedInUser, , , , , , , , , , databaseData] = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [detail, setDetail] = useState({})
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

    // const handleChange = (e) => {
    //     const updatedDetail = { ...detail }
    //     updatedDetail[e.target.name] = e.target.value;
    //     setDetail(updatedDetail)
    // }


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

                    <div className="col-md-6 col-md-offset">
                        <InnerImageZoom src={`data:image/png;base64,${product?.image?.img}`} zoomSrc={`data:image/png;base64,${product?.image?.img}`} zoomScale={0.5} draggable="false" className='not-draggable w-75 d-block mx-auto' alt="" />
                    </div>

                    <div className="col-md-5">
                        <h2 className='my-3 text-danger'>{product?.name}</h2>
                        <h3 className='text-success'><span className='h1 font-weight-bold text-success'>৳</span>{product?.price}</h3>

                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label className='h6 font-weight-bold'>ArtWork:</label>
                            <h6>{product?.artType}</h6>
                        </div>

                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label className='h6 font-weight-bold'>Paper:</label>
                            <h6>{product?.paper}</h6>
                        </div>

                        <div className='my-4'>
                            <h5 className='mb-3'>Frame Details</h5>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Material:</span> Fiber Stick</h6>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold'>Color:</span> Black</h6>

                            <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label className='h5 font-weight-bold'>Size: </label>
                                <h6>{product?.size}</h6>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h4 className='mb-3'>Inside Border:</h4>

                            <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label className='h6 font-weight-bold'>Color: </label>
                                <h6>{product?.borderSize}</h6>
                            </div>

                            <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label className='h6 font-weight-bold'>Size: </label>
                                <h6>{product?.borderColor}</h6>
                            </div>
                        </div>

                        {
                            showAdd & loggedInUser?.role !== 'admin' ?
                                <button onClick={addProduct} className='btn btn-success  w-50'>Add To Cart</button>
                                : loggedInUser?.role !== 'admin' ?
                                    <>
                                        <h5 className='text-danger font-weight-bold'>Already Added</h5>
                                        <button onClick={() => history.push('/cart')} className='btn btn-info w-50'>Go To Cart</button>
                                    </>
                                    : <h4 className='text-warning'>You are viewing as an admin.</h4>
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;