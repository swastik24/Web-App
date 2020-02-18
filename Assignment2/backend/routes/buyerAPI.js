const router=require('express').Router();
let User=require('../models/customer');

router.route('/').get((req,res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/exist').post((req,res)=>{
    const name=req.body.username;
    const pass=req.body.password;
    User.find({username :name ,password:pass})
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/checkexist').post((req,res)=>{
    const name=req.body.username;

    
    User.find({username:name})
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const newuser=new User({username,password});
        
    newuser.save()
        .then(()=>res.json('Customer added!'))
        .catch(()=>res.status(400).json('Error: '+err));
    
});

module.exports=router;