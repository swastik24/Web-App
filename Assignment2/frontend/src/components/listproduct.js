import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem,InputGroup,FormControl,Button } from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link ,withRouter,Redirect} from "react-router-dom";
import {Table} from  'react-bootstrap' 

export default  class Listproduct extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            arr:{},
            length:''
        };
       
        // axios.get('http://localhost:4000/list/user/'+this.state.id)
        // .then((res)=>{ 
        // this.setState({length:res.data.length})
        // this.setState({arr:res.data})
        // })

        
        this.createTable=this.createTable.bind(this)
        this.Delete=this.Delete.bind(this)
        this.getlist=this.getlist.bind(this)
    }
    componentDidMount(){
        this.getlist();
        this.interval = setInterval(() => {
            this.getlist();
          }, 3000);

    }
    Delete(e,info){
        e.preventDefault();
        console.log(info)
        const data={
            doc_id:info._id,
            id:this.props.match.params.id
        }
        axios.post('http://localhost:4000/list/delete',data)
        .then((res)=>{
            // console.log('fuckci')
            console.log(res)
            let newarr=this.state.arr
            delete newarr[info.index]
            console.log(newarr)
            this.setState({length:this.state.length-1})
            this.setState({arr:newarr})
            this.getlist()

        })
    }
        
    getlist(){
        axios.get('http://localhost:4000/list/user/'+this.state.id)
        .then((res)=>{ 
        this.setState({length:res.data.length})
        this.setState({arr:res.data})
        })
        
    }
    createTable(){

        let table=[]
        let child=[]
        child.push(<th>{'Product Name'}</th>)
        child.push(<th>{'Price'}</th>)
        child.push(<th>{'Quantity Left'}</th>)
        child.push(<th>{'Quantity'}</th>)
        child.push(<th>{'Delete'}</th>)
        table.push(<tr>{child}</tr>)
        for(var i=0;i<this.state.length;i++)
        {
            let children=[]
            let info={}
            info['index']=i
            let find=0;
            for (var key in this.state.arr[i]){
                if(this.state.arr[i]['quantity']==0)
                {
                    
                    find=1;
                    
                  
                }
                if(key!='username' && key!='_id' && key!='__v' && key!='status')
                {
                    children.push(<td>{this.state.arr[i][key]}</td>)
                }
                info[key]=this.state.arr[i][key]
            }
            children.push(<td><Button variant="danger" value={info} onClick={(e)=>this.Delete(e,info)} >Delete</Button></td>)
            if(find==0)
            table.push(<tr>{children}</tr>)

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


};