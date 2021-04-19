import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Footer from '../Home/Footer/Footer';
import './Cart.css';

const Cart = () => {
    const [, , , , cart, setCart] = useContext(UserContext);

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
        <>
            <div className='px-md-3 px-0 pt-5 mt-5 cart'>
                {
                    cart?.length ?
                        <h1 className='text-center px-3 display-5 text-success'>Total ArtWork in Cart: <span className='text-danger'>{cart.length}</span></h1>
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
                                                    <td className='img-td '><img src={`data:image/png;base64,${pd?.image?.img}`} draggable="false" className='w-100' alt="" /></td>
                                                    <td className='w-50 text-center'>
                                                        <h4 className='productName'>{pd?.name}</h4>
                                                        <p>{pd?.size}</p>
                                                    </td>
                                                    <td className='h5 text-center text-success'><span className='h3 font-weight-bold text-success'>৳</span>{pd?.price}</td>
                                                    <td >
                                                        <button onClick={() => removeItem(pd?.key)} className="btn btn-sm btn-danger d-block mx-auto">Remove</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Link to='/checkout'>
                                <button className='d-block mx-auto btn-lg btn-primary mb-2'>Proceed To Checkout</button>
                            </Link>
                        </>
                        :
                        ''
                }
            </div>
            <Footer className='fixed-bottom' />
        </>
    );
};

export default Cart;