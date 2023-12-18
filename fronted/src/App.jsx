import Navbar from "./navbar/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./pages/Footer"
import { useEffect } from "react"
import { fetchItemsByUserIdAsync} from "./features/cart/cartSlice"
import { useDispatch } from "react-redux"
export default function App() {
  const dispatch=useDispatch()
 
  return (
    <div className="app">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}