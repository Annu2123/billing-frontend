import {useSelector} from 'react-redux'
export default function Dashboard(){
    const {customer} = useContext(CustomersContext)
    const products = useSelector((state) => { 
        return state.products
    })
    const invoice=useSelector((state)=>{
        return state.invoice
    })
    console.log(invoice)
    return (
        <div>
            <h1>dashboard</h1>
            <h2>Total Products - { products.data.length } </h2>
            <h2>Total Customers - { customer.data.length }</h2>
            <h2> invoice {invoice && invoice.data.length}</h2>
        </div>
    )
}