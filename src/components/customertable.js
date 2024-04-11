import { Link } from "react-router-dom"
export default function CustomerTable(props){
    const {customer}=props
    return (
        <>
            <h2>customer table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>mobile</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                { customer && customer.data.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <Link to={`/customer/Show/${ele._id}`}><td> { ele.name }</td></Link>     
                                <td> { ele.constact.email } </td> 
                                <td> { ele.constact.mobile } </td> 
                                <td> 
                                    <button>view details</button>
                                </td>
                            </tr>
                        )
                    })} 
                </tbody>
            </table>
        </>
    )
}