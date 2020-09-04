import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';


function App() {
  return (
    <Router>
      <Route path='/'>
      <Header></Header>
      </Route>
    </Router>
  );
}

export default App;
