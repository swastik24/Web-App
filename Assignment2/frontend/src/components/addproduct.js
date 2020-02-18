import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link ,withRouter,Redirect} from "react-router-dom";
import './style.css'
import { log } from 'util';

export default  class Addproduct extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            fields: {},
            errors: {},
            id:this.props.match.params.id,
            name:'',
            price:'',
            quantity:''
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangename(e){
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
        this.setState({name:e.target.value})
    }
    onChangeprice(e){
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
        this.setState({price:e.target.value})
    }
    onChangequantity(e){
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
        this.setState({quantity:e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
    //     const newData={
    //         id:this.state.id,
    //         name: this.state.name,
    //         price: this.state.price,
    //         quantity: this.state.quantity
    //     }
    //     console.log(this.props.match.params.id)
       
    //    console.log(newData)
    //    axios.post('http://localhost:4000/list/add', newData)
    //     .then(res=>console.log(res));
        if (this.validateForm()) {
            console.log(this.state)
            let fields = {};
            fields["name"] = "";
            // fields["emailid"] = "";
            // fields["mobileno"] = "";
            fields["price"] = "";
            fields["quantity"] = "";
            this.setState({fields:fields});
            alert("Form submitted");
            const newData={
            id:this.state.id,
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity
            }
            axios.post('http://localhost:4000/list/add', newData)
            .then(res=>console.log(res));
        }
    
    }
    validateForm() {
  
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["name"]) {
          formIsValid = false;
          errors["name"] = "*Please enter appropriate product name.";
        }
  
        if (typeof fields["name"] !== "undefined") {
          if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["name"] = "*Please enter alphabet characters only.";
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
  
        if (!fields["price"]) {
          formIsValid = false;
          errors["price"] = "*Please enter the price of product";
        }
  
        if (typeof fields["price"] !== "undefined") {
          if (!fields["price"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["price"] = "*Please enter valid price (positive integer)";
          }
        }
        if (!fields["quantity"]) {
            formIsValid = false;
            errors["quantity"] = "*Please enter the quantity of the product";
          }
    
          if (typeof fields["quantity"] !== "undefined") {
            if (!fields["quantity"].match(/^[0-9]*$/)) {
              formIsValid = false;
              errors["quantity"] = "*Please enter valid quantity  (positive integer)";
            }
          }
  
        // if (!fields["password"]) {
        //   formIsValid = false;
        //   errors["password"] = "*Please enter your password.";
        // }
  
        // if (typeof fields["password"] !== "undefined") {
        //   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        //     formIsValid = false;
        //     errors["password"] = "*Please enter secure and strong password.";
        //   }
        
  
        this.setState({
          errors: errors
        });
        return formIsValid;
  
  
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
        <div>
            <div id="main-registration-container">
            <div id="register">
               <h3>Add Product</h3>
               <form   name="userRegistrationForm"  onSubmit= {this.onSubmit} >

               
               <label>Name of Product</label>
               <input type="text" name="name" value={this.state.fields.name} onChange={this.onChangename} />
               <div className="errorMsg">{this.state.errors.name}</div>
               
               
               <label>Price</label>
               <input type="number" name="price" value={this.state.fields.price} onChange={this.onChangeprice} />
               <div className="errorMsg">{this.state.errors.price}</div>

               
               <label>Quantity</label>
               <input type="number" name="quantity" value={this.state.fields.quantity} onChange={this.onChangequantity} />
               <div className="errorMsg">{this.state.errors.quantity}</div>

               
               <input type="submit" className="button"  value="ADD PRODUCT"/>
               
               
               </form>
            </div>
            </div>
        </div>
        )
    }
}