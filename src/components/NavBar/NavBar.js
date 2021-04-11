import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Navbar.css';

const NavBar = () => {
    const location = useLocation();
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const [expand, setExpand] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('login'));
    const handleExpand = () => {
        setExpand(!expand);
    }

    const isLocation = location.pathname === '/about';

    return (
        <nav className={`navbar navbar-expand-md navbar-light ${isLocation ? '' : 'nav-bg'}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img draggable="false" className="nav-logo rounded-circle" src={logo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" onClick={handleExpand} data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className={`nav-link active ${isLocation ? 'color-white' : ''}`} to='/'>Home</Link>
                        <div className="nav-item dropdown" >
                            <li className={`nav-link dropdown-toggle ${isLocation ? 'color-white' : ''}`} id='dropDownLink' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Art Works</li>
                            <div className="dropdown-menu" aria-labelledby="dropDownLink">
                                <Link className={`nav-link dropdown-item text-center ${isLocation ? 'color-white' : ''}`} to='/products/arabic calligraphy'>Arabic Calligraphy</Link>
                                <Link className={`nav-link dropdown-item text-center ${isLocation ? 'color-white' : ''}`} to='/products/illustration'>Illustration</Link>
                                <Link className={`nav-link dropdown-item text-center ${isLocation ? 'color-white' : ''}`} to='/products/portrait'>Portrait</Link>
                                <Link className={`nav-link dropdown-item text-center ${isLocation ? 'color-white' : ''}`} to='/products/quote card'>Quote Card</Link>
                                <Link className={`nav-link dropdown-item text-center `} to='/products/lyric card'>Lyric Card</Link>
                            </div>
                        </div>
                        <Link className={`nav-link ${isLocation ? 'color-white' : ''}`} to='/about'>About</Link>
                        {/* <Link className="nav-link" to='/review'>Reviews</Link> */}
                        {
                            user?.role !== 'admin' &&
                            <Link className={`nav-link d-flex flex-row align-items-center justify-content-center ${isLocation ? 'color-white' : ''}`} to='/cart'>
                                <i className={`fas fa-shopping-cart ${isLocation ? 'fa-shopping-cart-dark' : ''}`}></i>
                                <span className="badge badge-danger">{cart ? `${cart.length}` : '0'}</span>
                            </Link>
                        }
                        {
                            (user?.email || user?.name ) ?
                            (user?.role === 'user'? 
                            <Link className="nav-link" to='/dashboard/myOrder'>
                                <button className="btn btn-success rounded-pill px-4">DashBoard</button>
                            </Link>
                            :
                            <Link className="nav-link" to='/dashboard'>
                                <button className="btn btn-success rounded-pill px-4">Admin Panel</button>
                            </Link>)
                                :
                                location.pathname !== '/login' ?
                                    <Link className="nav-link" to='/login'>
                                        <button className="btn btn-primary rounded-pill px-4">LogIn</button>
                                    </Link>
                                    : ''
                        }

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;