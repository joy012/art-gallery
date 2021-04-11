/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import CheckOut from './components/CheckOut/Checkout';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Products from './components/Products/Products';
import DashBoard from './components/DashBoard/DashBoard'


export const UserContext = createContext();

function App() {
  const [databaseData, setDatabaseData] = useState(JSON.parse(sessionStorage.getItem('databaseProduct')) || []);
  const [cart, setCart] = useState([]);
  const [orderDetail, setOrderDetail] = useState({})
  const [paymentOption, setPaymentOption] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [user, setUser] = useState({
    isSignedIn: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    success: false,
    error: '',
    newUser: false
  })
  console.log(loggedInUser)

  useEffect(() => {
    fetch('https://tonus-creation.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem('databaseProduct', JSON.stringify(data))
            setDatabaseData(data)
        })
}, [])

  useEffect(() => {
    sessionStorage.getItem('login') &&
    setLoggedInUser(JSON.parse(sessionStorage.getItem('login')))
  }, [user])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, user, setUser, cart, setCart, orderDetail, setOrderDetail, paymentOption, setPaymentOption, databaseData, setDatabaseData]}>
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
          <Route exact path='/productDetail/:id'>
            <ProductDetail />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <PrivateRoute path='/checkout'>
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute path='/payment'>
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute path='/dashBoard'>
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute path='/admin/addAdmin'>
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute path='/admin/addProduct'>
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute path='/admin/allProduct'>
            <DashBoard />
          </PrivateRoute>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
