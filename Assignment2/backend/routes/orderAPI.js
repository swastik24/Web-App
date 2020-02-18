const router=require('express').Router();
let User=require('../models/order');


router.route('/').get((req,res)=>{
    console.log('shit')
    // User.deleteMany({})
    // .then(user=>res.json(user))
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').post((req,res)=>{
    // console.log(req.body)
    const name=req.body.name;
    const pid=req.body.pid;
    const quantity=req.body.quantity
    const newuser=new User({user:name,pid:pid,quantity:quantity,cancel:0});
    // console.log(newuser)
    newuser.save()
        .then((user)=>res.json(user))
        .catch(()=>res.status(400).json('Error: '+err));
    
});

router.route('/:id').get((req,res)=>{
    // console.log('shit')
    User.find({user:req.params.id})
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/update').post((req,res)=>{
    console.log(req.body)
    User.update({_id:req.body.doc_id},{$set:{quantity:req.body.value}})
    .then(user=>res.json(user))
    });
router.route('/vendor').post((req,res)=>{
    console.log(req.body)
    User.update({_id:req.body.id},{$set:{vrate:req.body.rate,vreview:req.body.review}})
    .then(user=>res.json(user))
    });
router.route('/product').post((req,res)=>{
    console.log(req.body)
    User.update({_id:req.body.id},{$set:{prate:req.body.rate,preview:req.body.review}})
    .then(user=>res.json(user))
    });
module.exports=router;