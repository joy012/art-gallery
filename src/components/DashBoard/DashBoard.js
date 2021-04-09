import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import AllOrder from './AdminPanel/AllOrder'
import AddProduct from './AdminPanel/AddProduct';
import AllProduct from './AdminPanel/AllProducts';
import AddAdmin from './AdminPanel/AddAdmin';
import './DashBoard.css';
import UserOrder from './UserPanel/UserOrder';


const Customer = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();

    return (
        <div className='container px-0 mx-auto mt-md-5 mt-0'>
            {
                !loggedInUser?.role &&
                <div class="text-center mt-5 pt-5">
                    <p class="spinner-border" role="status" aria-hidden="true"></p>
                </div>
            }

            {
                loggedInUser?.role &&
                <div className="row full-height">
                    <div className="col-md-3">
                        <nav className="nav flex-column justify-content-center align-items-md-start align-items-center my-5 ml-auto">

                            {
                                loggedInUser?.role === 'admin' &&
                                <>
                                    <Link to='/dashBoard' className="my-4 text-dark"><i class="fas fa-suitcase"></i> All Order</Link>
                                    <Link to='/admin/addProduct' className="mb-4 text-dark"><i class="fas fa-plus"></i> Add Product</Link>
                                    <Link to='/admin/addAdmin' className="mb-4 text-dark"><i class="fas fa-user-plus"></i> Make Admin</Link>
                                    <Link to='/admin/allProduct' className="mb-4 text-dark"><i class="fas fa-cart-arrow-down"></i> All Product</Link>
                                </>
                            }
                            {
                                loggedInUser?.role === 'user' &&
                                <Link to='/dashboard/nyOrder' className="mb-4 text-dark"><i class="fas fa-cart-arrow-down"></i> My Order</Link>
                            }
                            <Link to='/' className="text-dark"><i class="fas fa-home"></i> Home</Link>
                        </nav>
                    </div>

                    <div className="col-md-9 p-0 p-md-5" style={{ backgroundColor: "#F4F7FC", borderRadius: '16px' }}>
                        {
                            loggedInUser?.role === 'admin' && location.pathname === '/dashBoard' &&
                            <AllOrder />
                        }
                        {
                            loggedInUser?.role === 'admin' && location.pathname === '/admin/addProduct' &&
                            <AddProduct />
                        }
                        {
                            loggedInUser?.role === 'admin' && location.pathname === '/admin/allProduct' &&
                            <AllProduct />
                        }
                        {
                            loggedInUser?.role === 'admin' && location.pathname === '/admin/addAdmin' &&
                            <AddAdmin />
                        }
                        {
                            loggedInUser?.role === 'user' && location.pathname === '/dashboard/myOrder' &&
                            <UserOrder/>
                        }
                    </div>
                </div>
            }



        </div>
    );
};


export default Customer;