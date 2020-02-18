import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Login from './components/login';
import Register from './components/register';
import homepage from './components/home';
import Vendor from './components/vendor';
import Customer from './components/customer';

function App() {
  let names=localStorage.getItem('names')
  if(names){
    var i=1;
  }
  else
  {
    names=[]
    localStorage.setItem('names',JSON.stringify(names))
  }
  return (
    <Router >
      
      <div className="App">
      
      
       
      <Route path="/"  exact component={homepage}/>

      <Route path="/register"  component={Register}/>
      <Route path="/login" component={Login}/>
     
      <Route path="/vendor/:id" component={Vendor}/>
      <Route path="/customer/:id" component={Customer}/>
      
      </div>
    </Router>
  );
}

export default App;
