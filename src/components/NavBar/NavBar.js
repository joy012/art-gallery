import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light navbar-bg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo rounded-circle" src={logo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-link active" to='/home'>Home <span className="sr-only">(current)</span></Link>
                        <div className="nav-item dropdown" >
                            <Link className="nav-link dropdown-toggle" id='dropDownLink' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Paintings</Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownLink">
                                <Link className="nav-link dropdown-item text-center" to='/portrait'>Portrait</Link>
                                <Link className="nav-link dropdown-item text-center" to='/landscape'>Landscape</Link>
                                <Link className="nav-link dropdown-item text-center" to='/quote'>Quote Card</Link>
                                <Link className="nav-link dropdown-item text-center" to='/quote'>Lyrics Card</Link>
                            </div>
                        </div>
                        <Link className="nav-link" to='/about'>About</Link>
                        <Link className="nav-link" to='/review'>
                            <i className="fas fa-shopping-cart"></i>
                            <span className="badge badge-danger">9</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;