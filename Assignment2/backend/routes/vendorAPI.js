const router=require('express').Router();
let User=require('../models/vendors');

router.route('/').get((req,res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/exist').post((req,res)=>{
    const name=req.body.username;
    const pass=req.body.password;
    
    User.find({username:name,password:pass})
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
    console.log(newuser)
    newuser.save()
        .then(()=>res.json('Vendor added!'))
        .catch(()=>res.status(400).json('Error: '+err));
    
});

router.route('/addproduct').post((req,res)=>{
    console.log(req.body.id)

    
    User.updateOne({username:req.body.id},{$push:{product:{name:req.body.name,price:req.body.price,quantity:req.body.quantity}}})
    .then(()=>res.status(200).json('Product Added'))
    .catch(()=>res.status(400).json('Error: '+err));

});
module.exports=router;