import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link ,withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './style.css';
 class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
          fields: {},
          errors: {},
          username: '',
          password: '',
          type: 'vendor',
          checkerror:''  
        }
  
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeType=this.onChangeType.bind(this);
  
      };
  
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
                axios.post('http://localhost:4000/vendor/checkexist', newUser)
                    .then(res =>{
                    if(res.data.length==0)
                    {
                      axios.post('http://localhost:4000/buyer/add', newUser)
                      .then(res=>{
                        if(res.data.length>0)
                        {
                          this.setState({checkerror:'REGISTERED'})
                        }
                        else{
                          this.setState({checkerror:'Already exist'})  
                        }
                      })
                    }
                    else{
                      this.setState({checkerror:'Already exist'})  
                    }
                    
                    } )
                    
            }
            else {
                  axios.post('http://localhost:4000/buyer/checkexist', newUser)
                  .then(res =>{
                  if(res.data.length==0)
                  {
                    axios.post('http://localhost:4000/vendor/add', newUser)
                    .then(res=>{
                      if(res.data.length>0)
                      {
                        this.setState({checkerror:'REGISTERED'})
                      }
                      else{
                        this.setState({checkerror:'Already exist'})  
                      }
                    })
                  }
                  else{
                    this.setState({checkerror:'Already exist'})  
                  }
                  
                  } )
            }
            this.setState({
                username: '',
                password: '',
                type: ''
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
            errors["username"] = "*Please enter alphabet characters only.";
          }
        }
  
        // if (!fields["emailid"]) {
        //   formIsValid = false;
        //   errors["emailid"] = "*Please enter your email-ID.";
        // }
  
        // if (typeof fields["emailid"] !== "undefined") {
        //   //regular expression for email validation
        //   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        //   if (!pattern.test(fields["emailid"])) {
        //     formIsValid = false;
        //     errors["emailid"] = "*Please enter valid email-ID.";
        //   }
        // }
  
        // if (!fields["mobileno"]) {
        //   formIsValid = false;
        //   errors["mobileno"] = "*Please enter your mobile no.";
        // }
  
        // if (typeof fields["mobileno"] !== "undefined") {
        //   if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        //     formIsValid = false;
        //     errors["mobileno"] = "*Please enter valid mobile no.";
        //   }
        // }
  
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
  
        if (typeof fields["password"] !== "undefined") {
          if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password.";
          }
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid;
  
  
      }

    render(){
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
                <h3>Registration page</h3>
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
                {this.state.checkerror}
                <input type="submit" className="button"  value="Register"/>
                </form>
            </div>
        </div>
            </div>
            )
    }
}
export default Register;