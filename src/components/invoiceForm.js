import {useReducer, useState,useContext} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { CustomersContext } from '../contexts/root-context'
import { startCreateInvoice } from '../actions/invoices-action'
import { CustomerContext } from '../context/root-context'
function invoiceReducers(state,action){
    switch(action.type){
        case "ADD_ITEM":{
            return {...state,lineItems:[...state.lineItems, action.payload ]}
        }
        case 'UPDATE_ITEM' : {
            return { ...state, lineItems: state.lineItems.map((ele) => {
                if(ele._id == action.payload) {
                    return {...ele, quantity: ele.quantity + 1}
                } else {
                    return ele 
                }
            })}
        }
        case 'INCREMENT' : {
            return {...state, lineItems: state.lineItems.map((ele) => {
                if(ele._id == action.payload) {
                        return {...ele, quantity: ele.quantity + 1}
                } else { 
                    return ele 
                }
            })}
        }
        case 'DECREMENT' : {
            return {...state, lineItems: state.lineItems.map((ele) => {
                if(ele._id == action.payload) {
                        return {...ele, quantity: ele.quantity - 1}
                } else { 
                    return ele 
                }
            })}
        }
        case 'REMOVE_ITEM' : {
            return {...state, lineItems: state.lineItems.filter(ele => ele._id != action.payload)}
        }
      default :{
        return state
      }
    }
}
export default function InvoiceForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search,setSearch]=useState("")
    const [invoiceForm,invoiceDispatch]=useReducer(invoiceReducers,{
        customer:"",
        lineItems:[],
        taxes:"",
        discount:"",
        grossTotal:"",
        netTotal:""
    })
    const {customer}=useContext(CustomerContext)
    const products=useSelector((state)=>{
        return state.products
    })

    const handleChange = (e) => {
        const { name, value} = e.target
        // setForm({...form, [name]: value })
        invoiceDispatch({ type: 'HANDLE_CHANGE', payload: { name, value }})
    }
    const handleAdd=(id)=>{
   const product=products.data.find(ele => ele._id == id)
   const item={ _id: product._id, name: product.name, price: product.price, quantity: 1}
   const inLineItem=invoiceForm.lineItems.find(ele => ele._id ==product._id)
   if(inLineItem){
    invoiceDispatch({type:"UPDATE_ITEM",payload:inLineItem._id})
   }else{
    invoiceDispatch({type:"ADD_ITEM",payload:item})
   }
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {...invoiceForm}
        formData.lineItems = formData.lineItems.map((ele) => {
         return {
             product: ele._id, 
             quantity: ele.quantity
         }
        })
 
        const redirect = () => {
         navigate('/invoices')
        }
        dispatch(startCreateInvoice(formData, redirect))
        
     }
 
    

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?")
        if(userConfirm) {
            invoiceDispatch({ type: 'REMOVE_ITEM', payload: id })
        }
    }

    const calculateGrossTotal = () => {
        const result = invoiceForm.lineItems.reduce((acc, cv) => {
            return acc + cv.price * cv.quantity
        }, 0)
        // invoiceDispatch({ type: 'HANDLE_CHANGE', payload: { name: 'grossTotal', value: result }})
        return result 
    }

    const calculateNetTotal=()=>{
        const grossTotal=invoiceForm.lineItems.reduce((acc, cv) => {
            return acc + cv.price * cv.quantity
        }, 0)
        const deductions = grossTotal * invoiceForm.discount / 100 
        const additions = grossTotal * invoiceForm.taxes / 100 
        return grossTotal - deductions + additions
    }
    return (
        <div className='row'>
            <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
             {search && (
               <ul>
                {products.data.filter(ele => ele.name.toLowerCase().includes(search.toLowerCase())).map((ele)=>{
                    return <li key={ele._id} onClick={()=>{handleAdd(ele._id)}}>{ele.name}</li>
                })}
               </ul>
             )
              }
              <form onSubmit={handleSubmit}>

              <div className="form-group">
                    <label>Customer</label>
                    <select value={invoiceForm.customer} onChange={handleChange} name="customer">
                        <option value="">Select</option>
                        { customer.data.map((ele) => {
                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                        })}
                    </select>
                </div>
                <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>total</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceForm.lineItems.map((ele)=>{
                        return <tr>
                            <td>{ele.name}</td>
                            <td>{ele.price}</td>
                            <td><button onClick={()=>{invoiceDispatch({type:"DECREMENT",payload:ele._id})}}>-1</button>{ele.quantity} 
                               <button onClick={()=>{invoiceDispatch({type:"INCREMENT",payload:ele._id})}}>+1</button></td>
                               <td><buton onClick={() => {
                                        handleRemove(ele._id)}}>remove</buton>{}</td>
                        </tr>
                    })}
                </tbody>
                </table>

                <div className="form-group">
                    <label>Discount</label>
                    <input type="text" value={invoiceForm.discount} name="discount" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Taxes</label>
                    <select value={invoiceForm.taxes} name="taxes" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="5">5%</option>
                            <option value="18">18%</option>
                    </select>
                </div> 
                <input type='submit' />
              </form>


              <h2>Gross Total - { calculateGrossTotal() } </h2>
            <p>Discount - { invoiceForm.discount }</p>
            <p>Taxes - { invoiceForm.taxes } </p>
            <h2>Net Total - { calculateNetTotal() }</h2>
        </div>
    )
}