import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Navbar.css';

const NavBar = () => {
    const [loggedInUser, setLoggedInUser, user, setUser] = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();

    const isLocation = location.pathname === '/login' || location.hash === '#/reset';

    const signOut = () => {
        const logout = window.confirm('Are you sure you want to Log Out?');
        if (logout) {
            const updateUser = {
                isSignedIn: false,
                firstName: '',
                lastName: '',
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                success: false,
                error: '',
                newUser: false
            }
            setLoggedInUser(updateUser);
            setUser(updateUser);
            sessionStorage.setItem('name', '')
            sessionStorage.clear();
            history.push('/');
        }
    }


    return (
        <nav className={`navbar navbar-expand-md navbar-light ${!isLocation? 'navbar-bg' : ''} text-dark`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="logo rounded-circle" src={logo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-link" to='/'>Home</Link>
                        <div className="nav-item dropdown" >
                            <Link className="nav-link dropdown-toggle" id='dropDownLink' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Creations</Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownLink">
                                <Link className="nav-link dropdown-item text-center" to='/arabic'>Arabic Calligraphy</Link>
                                <Link className="nav-link dropdown-item text-center" to='/illustration'>Illustration</Link>
                                <Link className="nav-link dropdown-item text-center" to='/landscape'>Landscape</Link>
                                <Link className="nav-link dropdown-item text-center" to='/quote'>Quote Card</Link>
                                <Link className="nav-link dropdown-item text-center" to='/quote'>Lyric Card</Link>
                            </div>
                        </div>
                        <Link className="nav-link" to='/about'>About</Link>
                        <Link className="nav-link d-flex flex-row align-items-center justify-content-center" to='/customerCart'>
                            <i className="fas fa-shopping-cart"></i>
                            <span className="badge badge-danger">9</span>
                        </Link>
                        {
                            sessionStorage.getItem('name') && 
                            <Link className="nav-link" to='/dashBoard'>DashBoard</Link>
                        }
                        {
                            sessionStorage.getItem('name') ? <Link title="Click to LogOut" className="btn" onClick={signOut}>{sessionStorage.getItem('name')}</Link>
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