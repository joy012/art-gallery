import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import AllOrder from './AdminPanel/AllOrder'
import AddProduct from './AdminPanel/AddProduct';
import AllProduct from './AdminPanel/AllProducts';
import AddAdmin from './AdminPanel/AddAdmin';
import './DashBoard.css';
import UserOrder from './UserPanel/UserOrder';
import Footer from '../Home/Footer/Footer';


const Customer = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();

    return (
        <section style={{ minHeight: '100vh!important' }} className='container px-0 mx-auto mt-md-5 mt-0 mb-5'>
            {
                !loggedInUser?.role &&
                <div className="text-center mt-5 pt-5">
                    <p className="spinner-border" role="status" aria-hidden="true"></p>
                </div>
            }

            {
                loggedInUser?.role &&
                <div className="row full-height">
                    {
                        loggedInUser?.role === 'admin' &&
                        <div className="col-md-2">
                            <nav className="nav flex-column  justify-content-start align-items-center  my-5 ml-auto">


                                <Link to='/dashboard' className="my-4 text-dark"><i className="fas fa-suitcase"></i> All Order</Link>
                                <Link to='/admin/addProduct' className="mb-4 text-dark"><i className="fas fa-plus"></i> Add Product</Link>
                                <Link to='/admin/addAdmin' className="mb-4 text-dark"><i className="fas fa-user-plus"></i> Make Admin</Link>
                                <Link to='/admin/allProduct' className="mb-4 text-dark"><i className="fas fa-cart-arrow-down"></i> All Product</Link>
                            </nav>
                        </div>
                    }


                    <div className={`${loggedInUser?.role === 'admin' ? 'col-md-10' : 'col-12'} p-0 p-md-5`} style={{ backgroundColor: "#F4F7FC", borderRadius: '16px' }}>
                        {
                            loggedInUser?.role === 'admin' && location.pathname === '/dashboard' &&
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
                            <UserOrder />
                        }
                    </div>
                </div>
            }
        </section>
    );
};


export default Customer;