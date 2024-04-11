import {useDispatch} from 'react-redux'
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { startRemoveProduct } from '../actions/productActions'
import Addproduct from './addProduct';
export default function ProductTable(props){
    const [modal, setModal] = useState(false);
    const [editId,setEditId]=useState('')
  const toggle = () => setModal(!modal);

    const dispatch=useDispatch()
    const {products}=props
    const handleRemove=(id)=>{
        const userConfirm=window.confirm("are you sure")
        if(userConfirm){
            dispatch(startRemoveProduct(id))
        }
    }
    const lineItems=useSelector((state)=>{
        return state.invoice.data.find
    })
    return (
        <>
        <h1>total Product{products.data.length}</h1>
        <table className="table">
         <thead>
            <tr>
                <th>name</th>
                <th>price</th>
                <th>Description</th>
                <th>stock level</th>
                <th>Action</th>
            </tr>
         </thead>
         <tbody>
            {products && products.data.map((ele)=>{
                return <tr>
                    <td>{ele.name}</td>
                    <td>{ele.price}</td>
                    <td>{ele.description}</td>
                    <td>{ele.stockLevel}</td>
                    <td><button>show</button> 
                    <button onClick={()=>{setEditId(ele._id)
                                         toggle()}}>edit</button>
                    <button onClick={()=>{handleRemove(ele._id)}}>remove</button>
                    </td>
                </tr>
            })}
         </tbody>
        </table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
        <ModalBody>
         <Addproduct editId={editId} toggle={toggle}/>
        </ModalBody>
      </Modal>
   
        </>
    )
}