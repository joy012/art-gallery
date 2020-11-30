import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import './Cart.css';

const Cart = () => {
    const [, , , , cart, setCart] = useContext(UserContext);

    useEffect(() => {
        setCart(JSON.parse(sessionStorage.getItem('cart')));
    }, [])

    console.log(cart)

    return (
        <div className='container pt-5 mt-5'>
            <div className="table-container table-responsive mt-3 mb-5 mr-4 p-3">
                <table className="table">
                    <tbody>
                        {
                            !cart.length &&
                            <div class="d-flex align-items-center">
                                <strong>Loading...</strong>
                                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                        }
                        {
                            cart.map(pd =>
                                <tr>
                                    <td className='w-25'><img src={pd.image} className='w-75' alt="" /></td>
                                    <td className='w-25 h5'>{pd.name}</td>
                                    <td className='h4 text-center'>BDT {pd.price}</td>
                                    <td >
                                        <button className="btn btn-danger d-block mx-auto">Remove</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;