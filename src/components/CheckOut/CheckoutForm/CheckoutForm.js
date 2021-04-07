/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../../App';

const CheckoutForm = () => {
    const [, , , , cart, setCart, orderDetail, setOrderDetail] = useContext(UserContext);
    const [districts, setDistricts] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        fetch('https://bdapis.herokuapp.com/api/v1.0/districts')
            .then(res => res.json())
            .then(data => setDistricts(data.data))
        setCart(JSON.parse(sessionStorage.getItem('cart')))
    }, [setCart])

    const handleOnChange = e => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            if (!isFieldValid) {
                alert('Enter a valid email address');
                e.target.value = '';
            }
        }
        if (isFieldValid) {
            const updatedOrderDetail = { ...orderDetail };
            updatedOrderDetail[e.target.name] = e.target.value;
            setOrderDetail(updatedOrderDetail);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        history.push('/payment')
    }

    return (
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
                                    <div>
                                        <p class="font-wight-bold">{pd?.name}</p>
                                        <small class="font-weight-bold">Details:</small>
                                        <br />
                                        <small class="font-weight-bold">Paper Type:  </small>
                                        <small>{pd?.paper}</small>
                                        <br />
                                        <small class="font-weight-bold">Size:  </small>
                                        <small>{pd?.frameSize}</small>
                                        <br />
                                        <small class="font-weight-bold">Border Size:  </small>
                                        <small>{pd?.borderSize}</small>
                                        <br />
                                        <small class="font-weight-bold">Border Color:  </small>
                                        <small>{pd?.borderColor}</small>
                                    </div>
                                    <span >BDT{pd?.price}</span>
                                </li>
                            )
                        }
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                            <h5>Subtotal: </h5>
                            </div>
                            <span className='font-weight-bold'>BDT{cart.reduce((total,current) => total + current?.price, 0)}</span>
                        </li>
                    </ul>

                </div>
                <div class="col-md-8 order-md-1">
                    {
                        location.pathname === '/checkout' &&
                        <>
                            <h4 class="mb-4">Billing address</h4>
                            <form onSubmit={handleSubmit} class="needs-validation" novalidate>
                                <div className='row justify-content-between'>
                                    <div className='col-md-6'>
                                        <div class="from-group mb-4">
                                            <label for="lastName">Name</label>
                                            <input type="text" onChange={handleOnChange} class="form-control" id="lastName" name='name' placeholder="Enter Your Name" required />
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div class="from-group mb-4">
                                            <label for="email">Email</label>
                                            <input type="email" onChange={handleOnChange} class="form-control" id="email" name='email' placeholder="you@example.com" required />
                                        </div>
                                    </div>
                                </div>

                                <div className='row justify-content-between'>
                                    <div className='col-md-6'>
                                        <div class="from-group mb-4">
                                            <label for="phone">Mobile Number</label>
                                            <input type="text" onChange={handleOnChange} class="form-control" id="phone" name='mobile' placeholder="Enter Your Mobile Number" required />
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div class="from-group mb-4">
                                            <label for="district">City</label>
                                            <select class="form-control" onChange={handleOnChange} name='district' id="district">
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
                                    <input type="text" onChange={handleOnChange} class="form-control" id="address" name='address' placeholder="Enter Your Full Address" required />
                                </div>

                                <hr class="mb-4" />
                                <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to Payment</button>
                            </form>
                        </>
                    }

                    {
                        location.pathname === '/payment' &&
                        <>
                            <h4 class="mb-4">Select Your Payment Option</h4>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;