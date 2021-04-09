import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import Footer from '../Home/Footer/Footer';

const ProductDetail = () => {
    const { id } = useParams()
    const history = useHistory();
    const [, , , , , , , , , , databaseData] = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [detail, setDetail] = useState({})
    const [, , , , cart, setCart] = useContext(UserContext);
    const [showAdd, setShowAdd] = useState(true);


    useEffect(() => {
        console.log(id);
        const productDetail = databaseData.find(pd => pd?._id === id)
        console.log(productDetail)
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

                    <div class="col-md-6 col-md-offset">
                        <img src={`data:image/png;base64,${product?.image?.img}`} draggable="false" className='not-draggable w-75 d-block mx-auto' alt="" />
                    </div>

                    <div class="col-md-5">
                        <h2 className='my-3 text-success'>{product?.name}</h2>
                        <h3 className='text-danger'><span className='h1 font-weight-bold text-danger'>৳</span>{product?.price}</h3>

                        <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label className='h5'>ArtWork:</label>
                            <h6>{product?.artType}</h6>
                        </div>

                        <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-3">
                            <label className='h5'>Paper:</label>
                            <h6>{product?.paper}</h6>
                        </div>

                        <div className='my-4'>
                            <h4 className='mb-3'>Frame Details</h4>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold h5'>Material:</span> Fiber Stick</h6>

                            <h6 className='w-75 d-flex flex-row justify-content-between align-items-center'><span className='font-weight-bold h5'>Color:</span> Black</h6>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect1" className='h5 font-weight-bold'>Size: </label>
                                <h6>{product?.size}</h6>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h4 className='mb-3'>Inside Border:</h4>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect2" className='h5 font-weight-bold'>Color: </label>
                                <h6>{product?.borderSize}</h6>
                            </div>

                            <div class="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                <label for="exampleFormControlSelect3" className='h5 font-weight-bold'>Size: </label>
                                <h6>{product?.borderColor}</h6>
                            </div>
                        </div>

                        {
                            showAdd ?
                                <button onClick={addProduct} className='btn btn-success  w-50'>Add To Cart</button>
                                :
                                <button onClick={() => history.push('/cart')} className='btn btn-dark w-50'>Go To Cart</button>
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;