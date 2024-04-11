import {useSelector} from 'react-redux'
export default function Dashboard(){
    const invoice=useSelector((state)=>{
        return state.invoice
    })
    console.log(invoice)
    return (
        <div>
            <h1>dashboard</h1>
            <h2> invoice {invoice && invoice.data.length}</h2>
        </div>
    )
}