import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem,Button } from 'react-bootstrap';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom"
import Search from  './search'
import Order from './order'
export default class vendor extends Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state={
      
        id:this.props.match.params.id,
        
    }
    this.removeuser=this.removeuser.bind(this)
    
  }
  removeuser(){
    let newname=[]
    let lognames=[]
    lognames=JSON.parse(window.localStorage.getItem("names"));
    for(var i=0;i<lognames.length;i++)
    {
      if(lognames[i]!=this.state.id)
      {
          newname.push(lognames[i])
      }
    }
    localStorage.setItem("names", JSON.stringify(newname));
    this.props.history.push('/')
    window.location.reload();
  }  

    render(){
      let lognames=[]
      lognames=JSON.parse(window.localStorage.getItem("names"));
      console.log(lognames)
      var checker=0
      for(var i=0;i<lognames.length;i++)
      {
        if(lognames[i]==this.state.id)
          checker+=1
      }
      if(checker==0)
      {
        this.props.history.push('/')
        window.location.reload();
      }
        return(
            <Router>
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                
                <Nav.Link href={"/customer/"+this.props.match.params.id+"/search"}>Search Product</Nav.Link>
                <Nav.Link href={"/customer/"+this.props.match.params.id+"/order"}>Order</Nav.Link>

              
             </Nav>
             <Nav>
             <Button variant="success" onClick={this.removeuser}>Logout</Button>
        
           </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route path={"/customer/:id/search"} component={Search}/>
          <Route path={"/customer/:id/order"} component={Order}/>

          </div>
          </Router>
        
        )
    }

}