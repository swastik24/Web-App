import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Card,Button,Form,Modal,ButtonToolbar} from 'react-bootstrap';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom"
import axios from 'axios';

export default class vendor extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            id:this.props.match.params.id,
            arr:{},
            len1:0,
            product:{},
            len2:0,
            modal14: false
        }
        
        this.getDetails=this.getDetails.bind(this)
        this.edit=this.edit.bind(this)
        this.rateproduct=this.rateproduct.bind(this)
        this.ratevendor=this.ratevendor.bind(this)
      
    }
    componentDidMount(){
        this.getDetails();
        this.interval = setInterval(() => {
            this.getDetails();
          }, 3000);

    }
    ratevendor(e,index){
        let rating=prompt('Rate the vendor b/w (1,5):')
        let review=''
        if(rating>5 || rating<1)
        rating=''
        else if(rating>=1 && rating<=5)
        review=prompt('Write a review for the vendor: ')
        const data={
            id:this.state.arr[index[0]]._id,
            rate:rating,
            review:review
        }
        axios.post('http://localhost:4000/order/vendor',data)
        .then(res=>console.log('Vendor review updated'))
    }
    rateproduct(e,index){
        let rating=prompt('Rate the product b/w (1,5):')
        let review=''
        if(rating>5 || rating<1)
        rating=''
        else if(rating>=1 && rating<=5){
        review=prompt('Write a review for the product: ')
        }
        const data={
            id:this.state.arr[index[0]]._id,
            rate:rating,
            review:review
        }
        axios.post('http://localhost:4000/order/product',data)
        .then(res=>console.log('Product  review updated'))
    }
    getDetails(){
        axios.get('http://localhost:4000/order/'+this.state.id)
        .then(res=>{
            this.setState({arr:res.data})
            this.setState({len1:res.data.length})
            // console.log('arr')
            // console.log(this.state.arr)
        })
        axios.get('http://localhost:4000/list')
        .then(res=>{
            this.setState({product:res.data})
            this.setState({len2:res.data.length})

            // console.log('product')
            // console.log(this.state.product)
            this.render()
        })

    }

      
    edit(e,index){
        let inputvalue=prompt('Enter the quantity u want to order !')
        console.log('index array')
        console.log(index)
        if(inputvalue>(this.state.arr[index[0]].quantity+this.state.product[index[1]].quantity))
        {
            alert('Enter a valid input')
        }
        else{
            const q=this.state.arr[index[0]].quantity+this.state.product[index[1]].quantity
            // console.log('input')
            // console.log(inputvalue)
            let newarr=this.state.arr;
            newarr[index[0]].quantity=inputvalue
            this.setState({arr:newarr})
            
            
            
            // console.log('q')
            // console.log(q)
            
           
            newarr=this.state.product
            newarr[index[1]].quantity=q-inputvalue
            this.setState({product:newarr})
           
            const data={
                doc_id:this.state.product[index[1]]._id,
                quantity:q,
                value:inputvalue
            }
            const newdata={
                doc_id:this.state.arr[index[0]]._id,
                value:inputvalue
            }
            axios.post('http://localhost:4000/list/update', data)
            .then(res=>console.log(res.data))
            axios.post('http://localhost:4000/order/update',newdata)
            .then(res=>console.log(res.data))
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render()
    {   
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
        let array=[]
        
            for(var i=0;i<this.state.len1;i++){
                let but=''
                const index=[];
                let stat='Waiting'
                let k=0;
                let  rateProduct=''
                let rateVendor=''
                for(;k<this.state.len2;k++)
                {
                    if(this.state.arr[i].pid==this.state.product[k]._id)
                    {
                        // console.log('shit')
                        break
                    }

                }
                if(k==this.state.len2 && k==0 )
                continue
                // console.log(k)
            index[0]=i;index[1]=k;
            if(k==this.state.len2){
                stat='Product has been deleted by vendor'
                array.push(
                    <div>
                    <Card>
                    <Card.Header>Order {i+1}</Card.Header>
                    <Card.Body>
                        <Card.Title>Order Details</Card.Title>
                        <Card.Text>
                        
                        Status : {stat}
                        </Card.Text>
                        
                    </Card.Body>
                    </Card>
                    </div>
                )
                continue
            }
            if(this.state.product[k].quantity==0){
                stat='Placed'
                rateVendor=<Button variant="outline-secondary" onClick={(e)=>this.ratevendor(e,index)}>Rate Vendor</Button>
            }
            if(this.state.product[k].status=="Dispatched"){
                stat='Dispatched'
                rateProduct=<Button variant="outline-secondary" onClick={(e)=>this.rateproduct(e,index)}>Rate Product</Button>
            }
            if(this.state.arr[i].cancel==1)
                stat='Canceled'
            
            
            if(stat=='Waiting')
                but=<Button variant="primary" onClick={(e)=>this.edit(e,index)}>Edit</Button>

                array.push(
                <div>
                <Card>
                <Card.Header>Order {i+1}</Card.Header>
                <Card.Body>
                    <Card.Title>Order Details</Card.Title>
                    <Card.Text>
                    Product name:{this.state.product[k].productname}
                    <br/>
                    Vendor name:{this.state.product[k].username}
                    <br/>
                    Quantity ordered:{this.state.arr[i].quantity}
                    <br/>
                    Quantity Remaining: {this.state.product[k].quantity}
                    <br/>
                    Status : {stat}

                    </Card.Text>
                    {but}
                    <br/>
                    {rateProduct}
                    <br/><br/>
                    {rateVendor}
                   
                   
                </Card.Body>
                </Card>
                </div>
            )
        }
        
        return(
            <div>
            
            {array}
            </div>
        )
    }
}