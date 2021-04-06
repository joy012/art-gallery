/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { UserContext } from '../../../App';

const CheckoutForm = () => {
    const [, , , , cart, , orderDetail] = useContext(UserContext);

    return (
        <div class="container">

            <h2 className='text-center mt-5'>Checkout form</h2>

            <div class="row my-5">
                <div class="col-md-4 order-md-2 mb-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-primary">Your Cart</span>
                        <span class="badge badge-danger badge-pill">{cart.length}</span>
                    </h4>
                    <ul class="list-group mb-3">
                        {
                            cart.map(pd =>
                                <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <p class="font-wight-bold">{pd?.name}</p>
                                        <small class="my-3 font-weight-bold">Details:</small>
                                        <br/>
                                        <small class="text-muted">{pd?.paper}</small>
                                        <br/>
                                        <small class="text-muted">{pd?.frameSize}</small>
                                    </div>
                                    <span class="text-muted">BDT{pd?.price}</span>
                                </li>
                            )
                        }
                    </ul>

                    {/* <form class="card p-2">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Promo code" />
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-secondary">Redeem</button>
                            </div>
                        </div>
                    </form> */}
                </div>
                <div class="col-md-8 order-md-1">
                    <h4 class="mb-4">Billing address</h4>
                    <form class="needs-validation" novalidate>
                            <div class="from-group mb-4">
                                <label for="lastName">Name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="Name" required />
                                <div class="invalid-feedback">
                                    Valid Name is required.
                                </div>
                            </div>


                        <div class="from-group mb-4">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="you@example.com" required/>
                            <div class="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>

                        <div class="from-group mb-4">
                            <label for="phone">Mobile Number</label>
                            <input type="text" class="form-control" id="phone" placeholder="Enter Your Mobile Number" required/>
                            <div class="invalid-feedback">
                                Please enter a valid mobile number for shipping updates.
                            </div>
                        </div>

                        <div class="from-group mb-4">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                            <div class="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>
                        <hr class="mb-4" />
                        <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to Payment</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;