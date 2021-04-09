/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import money from '../../images/money.png';
import bkash from '../../images/bkash.png';
import './Checkout.css'
import Footer from '../Home/Footer/Footer';

const Checkout = () => {
    const [, , , , cart, setCart, orderDetail, setOrderDetail, paymentOption, setPaymentOption] = useContext(UserContext);
    const [districts, setDistricts] = useState([]);
    const [showStep, setShowStep] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const subtotal = cart.reduce((total, current) => total + current?.price, 0);
    const shippingCost = orderDetail?.city === 'Sylhet' ? 60 : 150

    useEffect(() => {
        fetch('https://bdapis.herokuapp.com/api/v1.0/districts')
            .then(res => res.json())
            .then(data => setDistricts(data.data))
        setCart(JSON.parse(sessionStorage.getItem('cart')))
        sessionStorage.getItem('orderDetail') !== null &&
            setOrderDetail(JSON.parse(sessionStorage.getItem('orderDetail')))
    }, [setCart, setOrderDetail])

    const handleOnChange = e => {
        const updatedOrderDetail = { ...orderDetail };
        updatedOrderDetail[e.target.name] = e.target.value;
        setOrderDetail(updatedOrderDetail);
        sessionStorage.setItem('orderDetail', JSON.stringify(updatedOrderDetail))
    }

    const handleSubmit = e => {
        e.preventDefault();
        getOrderDetail();
        getPaymentOption();
        history.push('/payment')
    }

    const getOrderDetail = () => {
        setOrderDetail(JSON.parse(sessionStorage.getItem('orderDetail')))
    }

    const getPaymentOption = () => {
        setPaymentOption(JSON.parse(sessionStorage.getItem('paymentOption')))
    }
    const setBkash = () => {
        sessionStorage.setItem('paymentOption', JSON.stringify('bkash'))
        setPaymentOption('bkash');
        setShowStep(true);
    }

    const setCash = () => {
        sessionStorage.setItem('paymentOption', JSON.stringify('cash'))
        setPaymentOption('cash');
        setShowStep(true);
    }


    return (
        <>
            <div class="container">

                {
                    location.pathname === '/checkout' ?
                        <h2 className='text-center mt-5'>Checkout form</h2>
                        :
                        location.pathname === '/payment' ?
                            <h2 className='text-center mt-5'>Payment Gateway</h2>
                            : ''
                }

                <div class="row my-5">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-primary">Artwork</span>
                            <span class="badge badge-danger badge-pill">{cart.length}</span>
                        </h4>
                        <ul class="list-group mb-3">
                            {
                                cart.map(pd =>
                                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                                        <div className='row w-75'>
                                            <h5 class="font-weight-bold col-12">{pd?.name}</h5>
                                            <br />
                                            <small class="font-weight-bold col-6">Paper Type:  </small>
                                            <small className='col-6'>{pd?.paper}</small>
                                            <br />
                                            <small class="font-weight-bold col-6">Size:  </small>
                                            <small className='col-6'>{pd?.frameSize}</small>
                                            <br />
                                            <small class="font-weight-bold col-6">Border Size:  </small>
                                            <small className='col-6'>{pd?.borderSize}</small>
                                            <br />
                                            <small class="font-weight-bold col-6">Border Color:  </small>
                                            <small className='col-6'>{pd?.borderColor}</small>
                                        </div>
                                        <h5 className='d-flex justify-content-between align-items-center'><span className='h2 font-weight-bold'>৳ </span> {pd?.price}</h5>
                                    </li>
                                )
                            }
                            <li class="list-group-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5>Subtotal: </h5>
                                    <h5 className='d-flex justify-content-between align-items-center'><span className='h2 font-weight-bold'>৳ </span> {subtotal}</h5>
                                </div>
                                {
                                    location.pathname === '/payment' &&
                                    <>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <h5>Shipping Cost: </h5>
                                            <h5 className='d-flex justify-content-between align-items-center'><span className='h2 font-weight-bold'>৳ </span> {shippingCost}</h5>
                                        </div>

                                        <div class="d-flex justify-content-between align-items-center">
                                            <h5>Total: </h5>
                                            <h5 className='d-flex justify-content-between align-items-center'><span className='h2 font-weight-bold'>৳ </span> {subtotal + shippingCost}</h5>
                                        </div>
                                    </>
                                }

                            </li>
                        </ul>

                    </div>
                    <div class="col-md-8 order-md-1">
                        {
                            location.pathname === '/checkout' &&
                            <>
                                <h4 class="mb-4">Billing address</h4>
                                <form onSubmit={handleSubmit} class="needs-validation" novalidate autocomplete="off">
                                    <div className='row justify-content-between'>
                                        <div className='col-md-6'>
                                            <div class="from-group mb-4">
                                                <label for="lastName">Name</label>
                                                <input type="text" onChange={handleOnChange} class="form-control" id="lastName" name='name' placeholder="Enter Your Name" autocomplete="off" required />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div class="from-group mb-4">
                                                <label for="email">Email</label>
                                                <input type="email"  onChange={handleOnChange} class="form-control" id="email" name='email' placeholder="you@example.com" autocomplete="off" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row justify-content-between'>
                                        <div className='col-md-6'>
                                            <div class="from-group mb-4">
                                                <label for="phone">Mobile Number</label>
                                                <input type="text" onChange={handleOnChange} class="form-control" id="phone" name='mobile' placeholder="Enter Your Mobile Number" autocomplete="off" required />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div class="from-group mb-4">
                                                <label for="city">City</label>
                                                <select class="form-control" onChange={handleOnChange} name='city' id="city">
                                                    <option selected disabled>Select Your City</option>
                                                    {
                                                        districts.map(districtData =>
                                                            <option>{districtData.district}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="from-group mb-4">
                                        <label for="address">Address</label>
                                        <input type="text" onChange={handleOnChange} class="form-control" id="address" name='address' placeholder="Enter Your Full Address" autocomplete="off" required />
                                    </div>

                                    <hr class="mb-4" />
                                    {
                                        orderDetail.name && orderDetail.email && orderDetail.city && orderDetail.address && orderDetail.mobile ?
                                            <button class="btn btn-success btn-lg d-block mx-auto" type="submit">Continue to Payment</button>
                                            :
                                            <button class="btn btn-secondary btn-lg d-block mx-auto disabled">Continue to Payment</button>
                                    }

                                </form>
                            </>
                        }

                        {
                            location.pathname === '/payment' &&
                            <>
                                <h4 class="mb-4">Select Your Payment Option</h4>
                                <div className={`row align-items-center justify-content-between mb-4`}>
                                    {
                                        orderDetail?.city === 'Sylhet' &&
                                        <div onClick={setCash} className="card h-100 col-6">
                                            <div className={`${paymentOption === 'cash' ? 'payment-card-after' : 'payment-card-before'} card-body text-center`}>
                                                <div>
                                                    <img className="w-25 my-4 pay" src={money} alt="" />
                                                </div>
                                                <h5 className="card-title">Cash On Delivery</h5>
                                            </div>
                                        </div>
                                    }

                                    <div onClick={setBkash} className={`card h-100 col-6 ${orderDetail?.city === 'Sylhet' ? '' : 'd-block mx-auto'}`}>
                                        <div className={`${paymentOption === 'bkash' ? 'payment-card-after' : 'payment-card-before'} card-body text-center`}>
                                            <div>
                                                <img className="w-25 my-4 pay" src={bkash} alt="" />
                                            </div>
                                            <h5 className="card-title">Bkash</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-2 mt-5'>
                                    {
                                        showStep ?
                                            (paymentOption === 'cash' ?
                                                <>
                                                    <h3 class='text-danger text-center mb-3'>Cash On Delivery</h3>
                                                    <h5 className='text-center'>You can pay the Delivery Man at your doorstep!</h5>
                                                    <button className='btn btn-success d-block w-50 my-5 mx-auto'>Place Order</button>
                                                </>

                                                :
                                                paymentOption === 'bkash' ?
                                                    <>
                                                        <h3 className='text-danger text-center mb-3'>Bkash Payment</h3>
                                                        <h5>Follow this steps to pay via Bkash:</h5>
                                                        <div className='my-2'>
                                                            <h6><span className='font-weight-bold'>Step 1: </span> Dial *247#</h6>
                                                            <h6><span className='font-weight-bold'>Step 2: </span> Select Send Money.</h6>
                                                            {/* <h6><span className='font-weight-bold'>Step 3: </span> Enter <span className='h5 text-danger'>01756463229</span> as Receiver account number.</h6> */}
                                                            <h6><span className='font-weight-bold'>Step 4: </span> Enter BDT <span className='h5 text-danger'>{subtotal + shippingCost}</span> to pay.</h6>
                                                            <h6><span className='font-weight-bold'>Step 5: </span> Enter <span className='h5 text-danger'>{orderDetail?.mobile.slice(7, 11)}</span> as reference.</h6>
                                                            <h6><span className='font-weight-bold'>Step 6: </span>Enter your PIN Number and pay.</h6>
                                                        </div>

                                                        <div className='mt-4'>
                                                            <h5>After successful payment You will get a <span className='text-danger'>Transaction ID </span> via SMS. Enter your Transaction ID.</h5>
                                                            <div class="form-group mt-5 w-75">
                                                                <label for="transaction" className='font-weight-bold h5'>Transaction ID</label>
                                                                <input type="text" onChange={handleOnChange} class="form-control" name='transaction' id="transaction" placeholder="Transaction Id.." required />
                                                            </div>
                                                            <h6 className='text-danger mt-3'>Wrong Transaction ID may result in unsuccessful order!!</h6>
                                                        </div>
                                                        {
                                                            orderDetail?.transaction ?
                                                                <button className='btn btn-success d-block w-50 my-4'>Place Order</button>
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