import React, {Component} from 'react';
import axios from 'axios';
import homepage from './home';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom"
import Register from './register';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './style.css'
export default class Login extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            fields: {},
            errors: {},
            username: '',
            password: '',
            type: 'vendor',
            redirect: false,
            id: ' ',
            loginerr: ' '
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeType=this.onChangeType.bind(this);
    }
    onChangeUsername(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
        this.setState({ username: e.target.value });
    }

    onChangePassword(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
        this.setState({ password: e.target.value });
    }
    onChangeType(e){
        this.setState({type:e.target.value});
    }
  
    onSubmit(e) {
        const check=0

        this.setState({loginerr:''})
        e.preventDefault();
        if (this.validateForm()) {
            console.log(this.state)
            let fields = {};
            fields["username"] = "";
            // fields["emailid"] = "";
            // fields["mobileno"] = "";
            fields["password"] = "";
            this.setState({fields:fields});
            // alert("Form submitted");
            const newUser = {
                username: this.state.username,
                password: this.state.password
            }
            if(this.state.type=='customer'){
            
                axios.post('http://localhost:4000/buyer/exist', newUser)
                    .then(res =>{
                        (res.data.length==1)?this.setState({redirect:true,id:res.data[0].username}):this.setState({loginerr:'*Username or Password is incorrect'})  })
                                
            }
            else {
                axios.post('http://localhost:4000/vendor/exist', newUser)
                .then(res => {
                   
                    (res.data.length==1)?this.setState({redirect:true,id:res.data[0].username}):this.setState({loginerr:'*Username or Password is incorrect'})                    
                });
                
            }
            
      
            this.setState({
                username: '',
                password: ''
            });
        }
        
    }
    validateForm() {
  
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["username"]) {
          formIsValid = false;
          errors["username"] = "*Please enter your username.";
        }
  
        if (typeof fields["username"] !== "undefined") {
          if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            // errors["username"] = "*Please enter alphabet characters only.";
          }
        }
  
        
  
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
  
        
  
        this.setState({
          errors: errors
        });
        return formIsValid;
  
  
      }
    render(){
        if(this.state.redirect)
        {
            let names=[]
            names=JSON.parse(window.localStorage.getItem("names"));
            // console.log(names)
            names.push(this.state.id)

            localStorage.setItem("names", JSON.stringify(names));
            if(this.state.type=='vendor')
            return <Redirect push to={"vendor/"+this.state.id}/>
            else{
               
                return <Redirect push to={"customer/"+this.state.id}/> 
            }
        }
        return(
            <div>
           
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">App</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
             </Nav>
             </Navbar.Collapse>
             </Navbar>
             <div id="main-registration-container">
             <div id="register">
                <h3>Login page</h3>
                <form   name="userRegistrationForm"  onSubmit= {this.onSubmit} >
                <label>UserName</label>
                <input type="text" name="username" value={this.state.fields.username} onChange={this.onChangeUsername} />
                <div className="errorMsg">{this.state.errors.username}</div>
                
                
                <label>Password</label>
                <input type="password" name="password" value={this.state.fields.password} onChange={this.onChangePassword} />
                <div className="errorMsg">{this.state.errors.password}</div>
                <div>
                <select value={this.state.type} onChange={this.onChangeType}>
                    <option value="vendor">Vendor</option>
                    <option value="customer">Customer</option>
                    
                </select>
                </div>
            <br/>
            <div className="errorMsg">
            {this.state.loginerr}
            </div>
                <input type="submit" className="button"  value="Login"/>
                
                </form>
            </div>
        </div>
            </div>
            )
    }
}