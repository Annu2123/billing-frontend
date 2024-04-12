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
        { customers.serverErrors.length > 0 && (
            <div>
                <h2>Server Errors</h2>
                <ul>
                    { customers.serverErrors.map((ele, i) => {
                        return <li key={i}> {ele.msg} </li>
                    })}
                </ul>
            </div>
        )}

        <form onSubmit={handleSubmit}>
            { /* create the form */ }
            <div className="form-group">
                <label 
                    htmlFor="name" 
                    className="form-label"
                >Name</label>
                <input 
                    type="text" 
                    value={form.name} 
                    onChange={handleChange} 
                    name="name" 
                    id="name" 
                    className='form-control'
                /> 
            </div>

            <div className="form-group">
                <label 
                    htmlFor="Email" 
                    className="form-label"
                >Email</label>
                <input 
                    type="text" 
                    value={form.email} 
                    onChange={handleChange} 
                    name="email" 
                    id="email" 
                    className='form-control'
                /> 
            </div>
            <div className="form-group">
                <label 
                    htmlFor="mobile" 
                    className="form-label"
                >Mobile</label>
                <input 
                    type="text" 
                    value={form.mobile} 
                    onChange={handleChange} 
                    name="mobile" 
                    id="mobile" 
                    className='form-control'
                /> 
            </div>
            <input type="submit" /> 
        </form>
    </>
    )
}