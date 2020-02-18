import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem,InputGroup,FormControl,Button,DropdownButton,Dropdown } from 'react-bootstrap';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import React, {Component} from 'react';
import {Table} from  'react-bootstrap' 
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom"
import axios from 'axios';

export default class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            name:'',
            arr:{},
            error:'',
            length:'',
            order:{},
            size:'',
            modal13:false
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.onChangename=this.onChangename.bind(this)
        this.createTable=this.createTable.bind(this)
        this.Order=this.Order.bind(this)
        this.getDetails=this.getDetails.bind(this)
        this.handleSort=this.handleSort.bind(this)
        this.showreview=this.showreview.bind(this)
        axios.get('http://localhost:4000/list')
        .then((res)=>{ 
     
        this.setState({length:res.data.length})
        this.setState({arr:res.data})

        
        })

        axios.get('http://localhost:4000/order/')
        .then(res=>{
            this.setState({order:res.data})
            this.setState({size:res.data.length})
            // console.log('arr')
            // console.log(this.state.arr)
        })

    }
   
      
    // componentDidMount(){
    //     this.getDetails();
    //     this.interval = setInterval(() => {
    //         this.getDetails();
    //       }, 8000);

    // }
    getDetails(){
        axios.get('http://localhost:4000/list/product/'+this.state.name)
        .then((res)=>{ 
     
        this.setState({length:res.data.length})
        this.setState({arr:res.data})

        
        })
        .then(()=>{
            (this.state.length>0)?(this.setState({error:''})):(this.setState({error:'* No Data with given product found'}))
        })
        // .catch(err=> this.setState({error:'Please enter appropriate name (it should be a  string)'}))
        axios.get('http://localhost:4000/order/')
        .then(res=>{
            this.setState({order:res.data})
            this.setState({size:res.data.length})
            // console.log('arr')
            // console.log(this.state.arr)
        })

    }
    handleSort(e){
        this.setState({
            arr:this.state.arr.sort((a,b)=>
                a[e]>b[e]?1:b[e]>a[e]?-1:0
            )
        });
    }
    showreview(e,index){
        let array=[]
        let x=''
        console.log(index)
        console.log(this.state.arr)
        console.log(this.state.order)
        for(var i =0;i<this.state.length;i++)
        {
            for(var j=0;j<this.state.size;j++)
            {
                if(this.state.arr[i]._id==this.state.order[j].pid && this.state.arr[i].username==this.state.arr[index].username)
                {
                    if(this.state.order[j].vreview)
                    {
                        // array.push(this.state.order[j].user)
                        // array.push(':')
                        // array.push(this.state.order[j].vreview)
                        // array.push('\n')
                        x+=this.state.order[j].user
                        x+=':'
                        x+=this.state.order[j].vreview
                        x+='\n'
                    }
                }
            }
        }
     
        alert(x)
    }



    Order(e,info){
 
        const inputvalue=prompt('Quantity is :')
        const data={
            username:info.username,
            productname:this.state.name,
            price: info.price,
            quantity:info.quantity,
            value:inputvalue,
            doc_id:info._id
        }
       
        if(data.value>data.quantity)
        {
            alert('Input quantity is more than the  present quantity')
        }
        else
        {
            axios.post('http://localhost:4000/list/update', data)
            .then((res)=>{
              
                let arrnew=this.state.arr
                arrnew[info.index]['quantity']=info.quantity-inputvalue
                console.log(arrnew[info.index]['quantity'])
                this.setState({arr:arrnew})
                console.log(this.state.arr[info.index]['quantity'])
                this.render()
            })
            const  info_data={
                name:this.state.id,
                pid:info._id,
                quantity:inputvalue
            }
            console.log(info_data)
            axios.post('http://localhost:4000/order/add',info_data)
            .then(res=>console.log(res.data))
            
        }
    }
    onSubmit(e)
    {

        e.preventDefault();
        
        this.getDetails()
    
   
    }

    onChangename(e)
    {
        this.setState({name:e.target.value})
        console.log(this.state.name)
        axios.get('http://localhost:4000/list/product/'+this.state.name)
        .then((res)=>{ 
     
        this.setState({length:res.data.length})
        this.setState({arr:res.data})

        
        })
        .then(()=>{
            (this.state.length>0)?(this.setState({error:''})):(this.setState({error:'* No Data with given product found'}))
        })
        axios.get('http://localhost:4000/order/')
        .then(res=>{
            this.setState({order:res.data})
            this.setState({size:res.data.length})
            // console.log('arr')
            // console.log(this.state.arr)
        })

        
        
    }
    createTable()
    {
        console.log(this.state.arr)
        let table=[]
        let child=[]
        child.push(<th>{'Vendor'}</th>)
        child.push(<th>{'Product'}</th>)

        child.push(<th>{'Price'}</th>)
        child.push(<th>{'Quantity'}</th>)
        child.push(<th>{'Order Button'}</th>)
        table.push(<tr>{child}</tr>)

        for(var i=0;i<this.state.length;i++)
        {
            let children=[]
            let info={}
            info['index']=i
            let remove=0
            for (var key in this.state.arr[i]){
                if(this.state.arr[i]['quantity']==0)
                {
                    remove=1
                }
                if( key!='_id' && key!='__v' && key!='initialquantity' && key!='status')
                {
                    if(key=='username')
                    children.push(<td onClick={(e)=>this.showreview(e,info['index'])}>{this.state.arr[i][key]}</td>)
                    else
                    children.push(<td>{this.state.arr[i][key]}</td>)

                    info[key]=this.state.arr[i][key]
                }
                info[key]=this.state.arr[i][key]

            }
            if(remove==1)
            continue
       
            children.push(<td><Button variant="success" value={info} onClick={(e)=>this.Order(e,info)} >Order</Button></td>)
            table.push(<tr>{children}</tr>)

        }
        return table
    }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
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
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Product name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={this.onChangename}
              />
            <InputGroup.Append >
              <Button variant="outline-dark" onClick={this.onSubmit}>Search</Button>
              <DropdownButton 
              id="Sort"
              title="Sort By"
              variant="info"
              onSelect={e=>this.handleSort(e)}
              >
              <Dropdown.Item eventKey="quantity">Quantity</Dropdown.Item>
              <Dropdown.Item eventKey="price">Price</Dropdown.Item>
              </DropdownButton>
            </InputGroup.Append>
          </InputGroup>
          <p>{this.state.error}</p>
           
            <Table responsive striped bordered hover variant="dark" striped bordered hover>
            {this.createTable()}
            </Table>
            </div>
        )
    }
}
