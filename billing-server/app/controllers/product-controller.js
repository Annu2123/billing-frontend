const Product=require('../models/product-model')
const {validationResult}=require('express-validator')
const productCntrl={}
  productCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
    const body=req.body
    const product=await Product.create(body)
    res.status(201).json(product)
    }catch(err){
        res.status(500).json({error:"internl server error"})
    }
}
productCntrl.list=async(req,res)=>{
    try{
  const product=await Product.find()
  res.status(200).json(product)
    }catch(err){
        res.status(500).json({error:"intrnal seerver error"})
    }
}
module.exports=productCntrl