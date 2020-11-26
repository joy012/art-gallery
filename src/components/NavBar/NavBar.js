import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Navbar.css';

const NavBar = () => {
    const location = useLocation();
    const isLocation = location.pathname === '/login' || location.hash === '#/reset';

    return (
        <nav className={`navbar navbar-expand-md navbar-light text-dark`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="nav-logo rounded-circle" src={logo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-link" to='/'>Home</Link>
                        <div className="nav-item dropdown" >
                            <Link className="nav-link dropdown-toggle" id='dropDownLink' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownLink">
                                <Link className="nav-link dropdown-item text-center" to='/products/arabic caligraphy'>Arabic Calligraphy</Link>
                                <Link className="nav-link dropdown-item text-center" to='/products/illustration'>Illustration</Link>
                                <Link className="nav-link dropdown-item text-center" to='/products/landscape'>Landscape</Link>
                                <Link className="nav-link dropdown-item text-center" to='/products/quote card'>Quote Card</Link>
                                <Link className="nav-link dropdown-item text-center" to='/products/lyric card'>Lyric Card</Link>
                            </div>
                        </div>
                        <Link className="nav-link" to='/about'>About</Link>
                        <Link className="nav-link" to='/review'>Reviews</Link>
                        <Link className="nav-link d-flex flex-row align-items-center justify-content-center" to='/cart'>
                            <i className="fas fa-shopping-cart"></i>
                            <span className="badge badge-danger">9</span>
                        </Link>
                        {
                            sessionStorage.getItem('name') && 
                            <Link className="nav-link" to='/dashBoard'>DashBoard</Link>
                        }
                        {
                            sessionStorage.getItem('name') ? <Link className="btn">{sessionStorage.getItem('name')}</Link>
                                :
                                location.pathname !== '/login' ?
                                <Link className="nav-link" to='/login'>
                                    <button className="btn btn-dark rounded-pill px-4">LogIn</button>
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