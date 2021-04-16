/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import ReCAPTCHA from "react-google-recaptcha";
import money from '../../images/money.png';
import bkash from '../../images/bkash.png';
import './Checkout.css'
import Footer from '../Home/Footer/Footer';

const Checkout = () => {
    const [, , , , cart, setCart, orderDetail, setOrderDetail] = useContext(UserContext);
    const [districts, setDistricts] = useState([]);
    const [showStep, setShowStep] = useState(false);
    const [reCaptcha, setReCaptcha] = useState();
    const [dbInitiate, setDbInitiate] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const subtotal = cart?.length !== 0 ? cart.reduce((total, current) => total + parseInt(current?.price), 0) : parseInt(0);
    const shippingCost = orderDetail?.city === 'Sylhet' ? 60 : 150
    const totalPayment = shippingCost + subtotal;

    useEffect(() => {
        fetch('https://bdapis.herokuapp.com/api/v1.0/districts')
            .then(res => res.json())
            .then(data => setDistricts(data.data))
        setCart(JSON.parse(sessionStorage.getItem('cart')))
        sessionStorage.getItem('orderDetail') !== null &&
            setOrderDetail(JSON.parse(sessionStorage.getItem('orderDetail')))
    }, [setCart, setOrderDetail])

    const handleOnChange = e => {
        const updatedOrderDetail = { ...orderDetail, "cart": cart, "paymentAmount": totalPayment, "status": 'PENDING' };
        updatedOrderDetail[e.target.name] = e.target.value;
        setOrderDetail(updatedOrderDetail);
        sessionStorage.setItem('orderDetail', JSON.stringify(updatedOrderDetail))
    }

    const handleSubmit = e => {
        e.preventDefault();
        getOrderDetail();
        history.push('/payment')
    }

    const getOrderDetail = () => {
        setOrderDetail(JSON.parse(sessionStorage.getItem('orderDetail')))
    }

    const setBkash = () => {
        const updatedOrderDetails = { ...orderDetail, "paymentMethod": 'Bkash' };
        setOrderDetail(updatedOrderDetails);
        sessionStorage.setItem('orderDetail', JSON.stringify(updatedOrderDetails))
        setShowStep(true)
    }

    const setCash = () => {
        const updatedOrderDetails = { ...orderDetail, "paymentMethod": 'Cash On' };
        setOrderDetail(updatedOrderDetails);
        sessionStorage.setItem('orderDetail', JSON.stringify(updatedOrderDetails))
        setShowStep(true);
    }

    const placeOrder = () => {
        setDbInitiate(true);
        fetch('https://tonus-creation.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetail)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setDbInitiate(false);
                    alert('one new service added successfully!');
                    setCart([]);
                    setOrderDetail({});
                    sessionStorage.removeItem('cart');
                    sessionStorage.removeItem('orderDetail')
                    history.replace('/dashboard/myOrder')
                }
            })
    }

    const handleCaptcha = (data) => {
        setReCaptcha(data)
    }


    return (
        <>
            <div className="container">

                {
                    location.pathname === '/checkout' ?
                        <h2 className='text-center mt-5'>Checkout form</h2>
                        :
                        location.pathname === '/payment' ?
                            <h2 className='text-center mt-5'>Payment Gateway</h2>
                            : ''
                }

                <div className="row my-5">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Artwork</span>
                            <span className="badge badge-danger badge-pill">{cart.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {
                                cart.map(pd =>
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div className='row w-75'>
                                            <h5 className="font-weight-bold col-12">{pd?.name}</h5>
                                            <br />
                                            <small className="font-weight-bold col-6">Paper Type:  </small>
                                            <small className='col-6'>{pd?.paper}</small>
                                            <br />
                                            <small className="font-weight-bold col-6">Size:  </small>
                                            <small className='col-6'>{pd?.frameSize}</small>
                                            <br />
                                            <small className="font-weight-bold col-6">Border Size:  </small>
                                            <small className='col-6'>{pd?.borderSize}</small>
                                            <br />
                                            <small className="font-weight-bold col-6">Border Color:  </small>
                                            <small className='col-6'>{pd?.borderColor}</small>
                                        </div>
                                        <h5 className='d-flex justify-content-between align-items-center'><span className='h3 font-weight-bold'>৳ </span> {pd?.price}</h5>
                                    </li>
                                )
                            }
                            <li className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>Subtotal: </h5>
                                    <h5 className='d-flex justify-content-between align-items-center'><span className='h3 font-weight-bold'>৳ </span> {subtotal}</h5>
                                </div>
                                {
                                    location.pathname === '/payment' &&
                                    <>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5>Shipping Cost: </h5>
                                            <h5 className='d-flex justify-content-between align-items-center'><span className='h3 font-weight-bold'>৳ </span> {shippingCost}</h5>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5>Total: </h5>
                                            <h5 className='d-flex justify-content-between align-items-center'><span className='h3 font-weight-bold'>৳ </span> {totalPayment}</h5>
                                        </div>
                                    </>
                                }

                            </li>
                        </ul>

                    </div>
                    <div className="col-md-8 order-md-1">
                        {
                            location.pathname === '/checkout' &&
                            <>
                                <h4 className="mb-4">Billing address</h4>
                                <form onSubmit={handleSubmit} className="needs-validation" novalidate autocomplete="off">
                                    <div className='row justify-content-between'>
                                        <div className='col-md-6'>
                                            <div className="from-group mb-4">
                                                <label for="lastName">Name</label>
                                                <input type="text" onChange={handleOnChange} className="form-control" id="lastName" name='name' placeholder="Enter Your Name" autocomplete="off" required />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className="from-group mb-4">
                                                <label for="email">Email</label>
                                                <input type="email" onChange={handleOnChange} className="form-control" id="email" name='email' placeholder="you@example.com" autocomplete="off" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row justify-content-between'>
                                        <div className='col-md-6'>
                                            <div className="from-group mb-4">
                                                <label for="phone">Mobile Number</label>
                                                <input type="text" onChange={handleOnChange} className="form-control" id="phone" name='mobile' placeholder="Enter Your Mobile Number" autocomplete="off" required />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className="from-group mb-4">
                                                <label for="city">City</label>
                                                <select className="form-control" onChange={handleOnChange} name='city' id="city">
                                                    <option selected disabled>Select Your City</option>
                                                    {
                                                        districts?.length ?
                                                            districts.map(districtData =>
                                                                <option>{districtData.district}</option>
                                                            )
                                                            :
                                                            <option className='text-danger'>Loading...</option>
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="from-group mb-4">
                                        <label for="address">Address</label>
                                        <input type="text" onChange={handleOnChange} className="form-control" id="address" name='address' placeholder="Enter Your Full Address" autocomplete="off" required />
                                    </div>

                                    <hr className="mb-4" />
                                    {
                                        orderDetail.name && orderDetail.email && orderDetail.city && orderDetail.address && orderDetail.mobile ?
                                            <button className="btn btn-success btn-lg d-block mx-auto" type="submit">Continue to Payment</button>
                                            :
                                            <button className="btn btn-secondary btn-lg d-block mx-auto disabled">Continue to Payment</button>
                                    }

                                </form>
                            </>
                        }

                        {
                            location.pathname === '/payment' &&
                            <>
                                <h4 className="mb-4">Select Your Payment Option</h4>
                                <div className={`row align-items-center justify-content-between mb-4`}>
                                    {
                                        orderDetail?.city === 'Sylhet' &&
                                        <div className="card h-100 col-6">
                                            <div className={`${orderDetail?.paymentMethod === 'Cash On' ? 'payment-card-after' : 'payment-card-before'} card-body text-center`}>
                                                <div>
                                                    <img className="w-25 my-4 pay" src={money} alt="" />
                                                </div>
                                                <h5 className="card-title">Cash On Delivery</h5>
                                                <button onClick={setCash} className='w-75 d-block mx-auto btn btn-danger'>Pay</button>
                                            </div>
                                        </div>
                                    }

                                    <div className={`card h-100 col-6 ${orderDetail?.city === 'Sylhet' ? '' : 'd-block mx-auto'}`}>
                                        <div className={`${orderDetail?.paymentMethod === 'Bkash' ? 'payment-card-after' : 'payment-card-before'} card-body text-center`}>
                                            <div>
                                                <img className="w-25 my-4 pay" src={bkash} alt="" />
                                            </div>
                                            <h5 className="card-title">Bkash</h5>
                                            <button onClick={setBkash} className='w-75 d-block mx-auto btn btn-danger'>Pay</button>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-2 mt-5'>
                                    {
                                        showStep ?
                                            (orderDetail?.paymentMethod === 'Cash On' ?
                                                <>
                                                    <h3 className='text-danger text-center mb-3'>Cash On Delivery</h3>
                                                    <h5 className='text-center'>You can pay the Delivery Man at your doorstep!</h5>
                                                    {
                                                        !reCaptcha ?
                                                            <div className='d-flex justify-content-center align-items-center my-4'>
                                                                <ReCAPTCHA
                                                                    sitekey="6LcRa6gaAAAAAEHMErHCOmMjB7URhgHzCJMuopz_"
                                                                    onChange={handleCaptcha}
                                                                />
                                                            </div>
                                                            :
                                                            (dbInitiate ?
                                                                    <button className='btn btn-success d-block w-50 my-4 mx-auto'>
                                                                        <div class="spinner-border text-white" role="status">
                                                                            <span class="sr-only">Loading...</span>
                                                                        </div>
                                                                    </button>
                                                                    :
                                                                    <button onClick={placeOrder} className='btn btn-success d-block w-50 mx-auto my-4'>Place Order</button>)  
                                                    }

                                                </>

                                                :
                                                orderDetail?.paymentMethod === 'Bkash' ?
                                                    <>
                                                        <h3 className='text-danger text-center mb-3'>Bkash Payment</h3>
                                                        <h5>Follow this steps to pay via Bkash:</h5>
                                                        <div className='my-2'>
                                                            <h6><span className='font-weight-bold'>Step 1: </span> Dial *247#</h6>
                                                            <h6><span className='font-weight-bold'>Step 2: </span> Select Send Money.</h6>
                                                            <h6><span className='font-weight-bold'>Step 3: </span> Enter <span className='h5 text-danger'>01756463229</span> as Receiver account number.</h6>
                                                            <h6><span className='font-weight-bold'>Step 4: </span> Enter <span className='h3 text-danger'>৳</span><span className='h5 text-danger'>{subtotal + shippingCost}</span> to pay.</h6>
                                                            <h6><span className='font-weight-bold'>Step 5: </span> Enter <span className='h5 text-danger'>{orderDetail?.mobile.slice(7, 11)}</span> as reference.</h6>
                                                            <h6><span className='font-weight-bold'>Step 6: </span>Enter your PIN Number and pay.</h6>
                                                        </div>

                                                        <div className='mt-4'>
                                                            <h5>After successful payment You will get a <span className='text-danger'>Transaction ID </span> via SMS. Enter your Transaction ID.</h5>
                                                            <div className="form-group mt-5 w-75">
                                                                <label for="transaction" className='font-weight-bold h5'>Transaction ID</label>
                                                                <input type="text" onChange={handleOnChange} className="form-control" name='txId' id="transaction" placeholder="Transaction Id.." required />
                                                            </div>
                                                        </div>
                                                        {
                                                            orderDetail?.txId ?
                                                                (!reCaptcha ?
                                                                    <ReCAPTCHA
                                                                        sitekey="6LcRa6gaAAAAAEHMErHCOmMjB7URhgHzCJMuopz_"
                                                                        onChange={handleCaptcha}
                                                                    />
                                                                    : '')
                                                                : <h6 className='text-danger mt-3'>Wrong Transaction ID may result in unsuccessful order!!</h6>
                                                        }
                                                        {
                                                            orderDetail?.txId && reCaptcha ?
                                                                (dbInitiate ?
                                                                    <button className='btn btn-success d-block w-50 my-4'>
                                                                        <div class="spinner-border text-white" role="status">
                                                                            <span class="sr-only">Loading...</span>
                                                                        </div>
                                                                    </button>
                                                                    :
                                                                    <button onClick={placeOrder} className='btn btn-success d-block w-50 my-4'>Place Order</button>)
                                                                :
                                                                <button className='btn btn-secondary d-block w-50 my-4 disabled'>Place Order</button>

                                                        }
                                                    </>
                                                    : "")
                                            : ''

                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;