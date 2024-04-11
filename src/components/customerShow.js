import {useParams,useNavigate} from 'react-router-dom'
import { CustomerContext } from '../context/root-context'
import { useContext,useState } from 'react'
import axios from 'axios'
import CustomerForm from './customerForm'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
export default function CustomerShow(){
    const {customer,customerDispatch}=useContext(CustomerContext)
    const [modal, setModal] = useState(false);
    const [editId,seteditId]=useState('')
    const toggle = () => setModal(!modal);
    const navigate=useNavigate()
    const {id}=useParams()
    const consumer=customer.data.find(ele => ele._id==id)
    const handleClick=async()=>{
        const userConfirm=window.confirm("are you sure")
        if(userConfirm){
            try{
                const response=await axios.delete(`http://localhost:3046/api/customer/${id}`)
            customerDispatch({type:"REMOVE_CUSTOMER",payload:response.data})
            navigate('/customer')
            }catch(err){
                console.log(err)
            }
        }

    }
    const handleDelete=async()=>{
        seteditId(consumer._id)
        toggle()

    }
    return(
        <div>
            <h2>Customer details-{id}</h2>
       {consumer?.name}  - {consumer?.constact.email}
       <button onClick={handleClick}>remove</button>
       <button onClick={handleDelete}>edit</button>
       <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
        <ModalBody>
         <CustomerForm consumer={consumer} toggle={toggle}/>
        </ModalBody>
      </Modal>
        </div>
    )
}