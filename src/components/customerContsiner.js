import { useContext } from "react"
import { CustomerContext } from "../context/root-context"
import CustomerTable from "./customertable"
import CustomerForm from "./customerForm"
export default function CustomerContainer(){
    const {customer}=useContext(CustomerContext)
    return (
        < div className="row">
            <h1>customer conainer-{customer && customer.data?.length}</h1>
            <div className='col-md-8'>
                 <CustomerTable customer={customer} />
            </div>
            <div className='col-md-4'>
                <h2>Add customer</h2>
               <CustomerForm/>
            </div>
        </div>
    )
}