import {useSelector} from 'react-redux'
import ProductTable from './productTable'
import Addproduct from './addProduct'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import  {setServerError} from '../actions/productActions'
export default function ProductsContainer(){
    const dispatch=useDispatch()
    const products=useSelector((state)=>{
        return state.products
    })
    useEffect(()=>{
        return ()=>{
            dispatch(setServerError([]))
        }
    },[])
    return(
        <div className='row'>
            <h1>total Products- {products.data.length}</h1>
            <div className='col-md-8'>
                 <ProductTable products={products}/>
            </div>
            <div className='col-md-4'>
               <Addproduct/>
            </div>
        </div>
    )
}