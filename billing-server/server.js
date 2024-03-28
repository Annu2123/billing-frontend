require('dotenv').config()
const express=require('express')
const cors=require('cors')
const {checkSchema}=require("express-validator")
const port=process.env
const app=express()
app.use(cors())
app.use(express.json())
const configDb=require('./config/db')
configDb()
const productCntrl=require('./app/controllers/product-controller')

const productValidationSchema=require('./app/validations/product-validation') 
app.post('/api/products',checkSchema(productValidationSchema),productCntrl.create)
app.get('/api/products',productCntrl.list)
app.listen(port,()=>{
    console.log("server is running in port " + port)
})