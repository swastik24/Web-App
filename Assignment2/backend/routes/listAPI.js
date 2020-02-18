const router=require('express').Router();
let User=require('../models/vendorproductlist');

router.route('/').get((req,res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').post((req,res)=>{
    // console.log(req.body)
    const newitem=new User({username:req.body.id,productname:req.body.name,price:req.body.price,quantity:req.body.quantity,initialquantity:req.body.quantity,status:'None'})
    // console.log(newitem)
    newitem.save()
    .then(()=>res.json('Item added!'))
    .catch(()=>res.status(400).json('Error: '+err));
});
router.route('/user/:id').get((req,res)=>{
    // console.log(req.params.id)
    User.find({username:req.params.id})
    .then(users=>res.json(users))
});
function escapeRegex(text){
 return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // retur//n text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}
router.route('/product/:id').get((req,res)=>{
    // console.log(req.params.id)
    req.params.id=RegExp(escapeRegex(req.params.id),'gi')
    // console.log(t)

    User.find({productname:req.params.id})
    .then(users=>res.json(users))
});
router.route('/update').post((req,res)=>{
    console.log(req.body)
    User.update({_id:req.body.doc_id},{$set:{quantity:req.body.quantity-req.body.value}})
    .then(user=>res.json(user))
});
router.route('/delete').post((req,res)=>{
    console.log(req.body)
    User.deleteOne({_id:req.body.doc_id})
    .then(user=>res.json(user))
//    User.deleteMany({})
//    .then(user=>res.json(user))

   
});
router.route('/status').post((req,res)=>{
    User.update({_id:req.body.doc_id},{$set:{status:req.body.status}})
    .then(user=>res.json(user))
})


module.exports=router;