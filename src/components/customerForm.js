import axios from 'axios'
import {useState} from 'react'
import {useContext} from 'react'
import { CustomerContext } from '../context/root-context'
export default function CustomerForm(props){
    // const {customer}=useContext(CustomerContext)
    const {consumer}=props
    // const customer=()=>{
    //     return customer.data.find(ele => ele._id == props.editId)
    // }
    console.log("ddad",consumer)
    const {customerDispatch}=useContext(CustomerContext)
    const [form,setForm]=useState(consumer ? {
   name:consumer.name,
   email:consumer.constact.email,
   mobile:consumer.constact.mobile
    }:{
        name:"",
        email:"",
        mobile:""

    }

    )
    
    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
            name:form.name,
            constact:{
                email:form.email,
                mobile:form.mobile
            }
          
        }
        try{
            const response=await axios.post('http://localhost:3046/api/customer',formData)
            console.log(response.data)
            customerDispatch({type:"ADD_CUSTOMER",payload:response.data})
          }catch(err){
            console.log(err)
          }
    }
    return (
        <>
            <h1>add form</h1>
            <form onSubmit={handleSubmit}>
                <label>enter name</label>

                <input type='text'name='name' value={form.name} onChange={handleChange}/><br/>
                <label>contact</label>

                <input type='text'name='email' value={form.email} onChange={handleChange}/>
                <input type='text'name='mobile' value={form.mobile} onChange={handleChange}/><br/>
                <input  type='submit'/>
            </form>
        </>
    )
}