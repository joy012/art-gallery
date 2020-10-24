import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [user, setUser] = useState({
    isSignedIn: false,
    firstName: '',
    lastName: '',
    name : '',
    email: '',
    password: '',
    confirmPassword: '',
    success: false,
    error: '',
    newUser: false
  })

  if(user.firstName && user.lastName){
    user.name = user.firstName + ' ' + user.lastName;
  }

  if(loggedInUser.name){
    sessionStorage.setItem('name', loggedInUser.name);
  }


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, user, setUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/login'>
            <LogIn/>
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
