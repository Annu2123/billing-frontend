import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { startGetProducts } from "./actions/productActions";
function App() {
  const dispatch=useDispatch()
  const products=useSelector((state)=>{
    return state.products
  })
  useEffect(()=>{
 dispatch(startGetProducts())
  },[dispatch])
  return (
    <div className="App">
     <h1>listing Products- {products.data.length}</h1>
    </div>
  );
}

export default App;
