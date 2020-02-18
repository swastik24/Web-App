import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem,InputGroup,FormControl,Button } from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link ,withRouter,Redirect} from "react-router-dom";
import {Table} from  'react-bootstrap' 

export default  class Readytodispatch extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            id:this.props.match.params.id,
            arr:{},
            length:''
         
        }
        this.getlist=this.getlist.bind(this)
        this.createTable=this.createTable.bind(this)
        this.Dispatch=this.Dispatch.bind(this)

    }
    componentDidMount(){
        this.getlist();
        this.interval = setInterval(() => {
            this.getlist();
          }, 3000);

    }
    getlist(){
        axios.get('http://localhost:4000/list/user/'+this.state.id)
        .then((res)=>{ 
        this.setState({length:res.data.length})
        this.setState({arr:res.data})
        })
        
    }
    Dispatch(e,info){
        // let newarr=this.state.arr;
        // newarr[info.index]['status']="Dispatched"
        // console.log(newarr)
        // this.setState({arr:newarr})
        const  data={
            doc_id:info._id,
            status:"Dispatched"
        }
        axios.post('http://localhost:4000/list/status',data)
        .then((res)=>{
            let newarr=this.state.arr
            delete newarr[info.index]
            
            this.setState({length:this.state.length-1})
            this.setState({arr:newarr})
            this.getlist()
        })


    }
    createTable(){
        console.log('shit')
        let table=[]
        let child=[]
        child.push(<th>{'Product Name'}</th>)
        child.push(<th>{'Price'}</th>)
        child.push(<th>{'Quantity Left'}</th>)
        child.push(<th>{'Quantity'}</th>)
        child.push(<th>{'Dispatch'}</th>)
        table.push(<tr>{child}</tr>)
        for(var i=0;i<this.state.length;i++)
        {
            let children=[]
            let info={}
            info['index']=i
            let find=0;
            let buttonpresent=0
            for (var key in this.state.arr[i]){
                // console.log(this.state.arr[i]['quantity'])
                if(this.state.arr[i]['quantity']==0)
                {
                    find=1
                }
                if(this.state.arr[i]['status']=="None")
                {
                    buttonpresent=1
                }
                console.log('fuck')
                if(key!='username' && key!='_id' && key!='__v' && key!='status' )
                {
                    children.push(<td>{this.state.arr[i][key]}</td>)
                }
                info[key]=this.state.arr[i][key]
            }
            if(buttonpresent==1)
            children.push(<td><Button variant="danger" value={info} onClick={(e)=>this.Dispatch(e,info)} >Dispatch</Button></td>)
            else
            continue

            if(find==1)
            {
                table.push(<tr>{children}</tr>)
            }
        }
        return table
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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
            <br/><br/>
            <Table responsive striped bordered hover variant="dark" striped bordered hover>
            {this.createTable() }
            </Table>
            </div>
        )
    }
}

