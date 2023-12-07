import Navbar from "./navbar/NavBar"
import { Outlet } from "react-router-dom"
import Footer from "./pages/Footer"
export default function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}