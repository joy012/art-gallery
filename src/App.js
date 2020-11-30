import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Products from './components/Products/Products';


export const UserContext = createContext();

function App() {
  const [role, setRole] = useState('');
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [user, setUser] = useState({
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
  })

  if (user.firstName && user.lastName) {
    user.name = user.firstName + ' ' + user.lastName;
  }


  const data = async () => {
    const fetchData = await fetch('https://creative-agency-spa.herokuapp.com/getAdmin?email=' + loggedInUser.email);
    const response = await fetchData.json();
    return response;
  }

  if (loggedInUser.email && loggedInUser.name && !loggedInUser.role) {
    sessionStorage.setItem('name', loggedInUser.name);
    sessionStorage.setItem('email', loggedInUser.email);
    data().then(data => {
      if (data.length !== 0) {
        setRole('admin');
        sessionStorage.setItem('role', role);
      }
      else {
        setRole('user');
        sessionStorage.setItem('role', role);
      }
    })

  }

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, user, setUser, cart, setCart]}>
      <Router>
        < NavBar />
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/login'>
            <LogIn />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route exact path='/products/:name'>
            <Products />
          </Route>
          <Route exact path='/productDetail/:key'>
            <ProductDetail />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
