import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Cart.css';

const Cart = () => {
    const [, , , , cart, setCart, orderDetail ] = useContext(UserContext);

    useEffect(() => {
        setCart(JSON.parse(sessionStorage.getItem('cart')));
    }, [setCart])

    const removeItem = key => {
        const savedCart = JSON.parse(sessionStorage.getItem('cart'));
        const updateStore = savedCart.filter(product => product.key !== key);
        sessionStorage.setItem('cart', JSON.stringify(updateStore));
        setCart(updateStore);
    }

    return (
        <div className='px-md-3 px-0 pt-5 mt-5'>
            {
                cart?.length ?
                    <h1 className='text-center px-3 display-5 text-success'>Total Item in Cart: <span className='text-danger'>{cart.length}</span></h1>
                    : <h1 className='text-center px-3 display-5 text-danger'>Your Cart is Empty!</h1>

            }

            {
                cart?.length ?
                <>
                    <div className="table-container table-responsive mt-3 mb-5 mr-4 p-3">
                        <table className="table">
                            <tbody>
                                {
                                    cart?.map(pd =>
                                        <tr>
                                            <td className='img-td '><img src={pd?.image} className='w-100' alt="" /></td>
                                            <td className='h5 w-50 text-center'>{pd?.name}</td>
                                            <td className='h6 text-center'>BDT {pd?.price}</td>
                                            <td >
                                                <button onClick={() => removeItem(pd?.key)} className="btn btn-danger d-block mx-auto">Remove</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td colspan='2' className='h3 text-center'>Total Cost: </td>
                                    <td colspan='2' className='h4 text-center'>BDT {cart.reduce((total, current) => total + current?.price, 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link to='/checkout'>
                        <button className='d-block ml-md-auto mx-auto mx-md-0 btn-lg btn-primary mb-5'>Proceed To Checkout</button>
                    </Link>
                </>
                :
                ''
            }
        </div>
    );
};

export default Cart;