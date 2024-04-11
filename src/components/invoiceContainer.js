import InvoiceForm from "./invoiceForm";
import { useState } from "react";
import {useSelector} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
export default function InvoiceContainer(){
    const [modal, setModal] = useState(false);
    const [editId,setEditId]=useState('')
  const toggle = () => setModal(!modal)
    const invoice=useSelector((state)=>{
        return state.invoice
    })
    console.log("invoice",invoice)

    const handleCLick=(id)=>{
        setEditId(id)
        toggle()
    }
 
    return (
        <>
        <h1>container</h1>
        <InvoiceForm/>

        <table>
            <thead>
                <tr>
                    <th>customer</th>
                    <th>lineItems</th>
                    <th>discount</th>
                    <th>taxes</th>
                    <th>netTotal</th>
                    <th>outstandingBalance</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                     invoice && invoice.data.map((ele)=>{
                        return <tr>
                            <td>{ele.customer}</td>
                            <td><button onClick={()=>{handleCLick(ele._id)}}>show2</button></td>
                            <td>{ele.discount}</td>
                            <td>{ele.taxes}</td>
                            <td>{ele.netTotal}</td>
                            <td>{ele.outstandingBalance}</td>
                            <td><button>more</button> <button>pay</button></td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
        <ModalBody>
    {invoice.data.find(ele =>ele._id== editId)?.lineItems.map((lin)=>{
        return <div>
            <li>{lin.product.name}</li>
            <li>{lin.quantity}</li>
        </div>
    })}
        </ModalBody>
      </Modal>
        </>
    )
}