import { useState } from "react"
import {useDispatch ,useSelector} from 'react-redux'
import {startCreateProduct,startUpdateProduct} from '../actions/productActions'
export default function Addproduct(props){
    const dispatch=useDispatch()
    const serverError=useSelector((state)=>{
        return state.serverError
    })
    const product=useSelector((state)=>{
        return state.products.data.find(ele => ele._id==props.editId)
    })
    const [form,setForm]=useState(
        product ? {
            name:product.name,
            description:product.description,
            price:product.price,
            stockLevel:product.stockLevel,
            reorderLevel:product.reorderLevel
        }:{
        name:"",
        description:"",
        price:"",
        stockLevel:"",
        reorderLevel:""

    })
    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()

        const reset=()=>{
            setForm({
                name:"",
                description:"",
                price:"",
                stockLevel:"",
                reorderLevel:""
            })
        }
        if(product){
            dispatch(startUpdateProduct(product._id,form,reset,props.toggle))
        }else{
            dispatch(startCreateProduct(form,reset))
        }
       
    }
   
    return (
         <>
         <h2>add product</h2>
         <form  onSubmit={handleSubmit}className="form">
            <div className="form-group">
                <label htmlFor="name" className="form-lable">name</label>
                <input
                 className="form-control"
                 value={form.name}
                 name="name"
                 onChange={handleChange}
                 id="name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="price" className="form-lable">price</label>
                <input
                 className="form-control"
                 value={form.price}
                 name="price"
                 onChange={handleChange}
                 id="price"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="form-lable">description</label>
                <input
                 className="form-control"
                 value={form.description}
                 name="description"
                 onChange={handleChange}
                 id="description"
                />
            </div>
            <div className="form-group">
                <label htmlFor="stockLevel" className="form-lable">stockLevel</label>
                <input
                 className="form-control"
                 value={form.stockLevel}
                 name="stockLevel"
                 onChange={handleChange}
                 id="stockLevel"
                />
            </div>
            <div className="form-group">
                <label htmlFor="reorderLevel" className="form-lable">reorderLevel</label>
                <input
                 className="form-control"
                 value={form.reorderLevel}
                 name="reorderLevel"
                 onChange={handleChange}
                 id="reorderLevel"
                />
            </div>
            <input type="submit" className=" mt-2 btn btn-primary"/>
         </form>
         </>
    )
}