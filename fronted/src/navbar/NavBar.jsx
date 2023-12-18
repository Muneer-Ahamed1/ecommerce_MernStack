import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link, NavLink } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from "react"
import Navmb from "./Navmb"
import { useDispatch, useSelector } from "react-redux"
import {SignOut} from "../features/auth/authSlice";

export default function Navbar() {
    const [state, setState] = useState(true);
    const user = useSelector((state)=>state.Auth.isLoginUser) 
    const items = useSelector((state)=>state.Cart.items);
    console.log(user);

    if (state) {
        return (
            <div className="Navbar  bg-gray-50 flex justify-between py-2 px-8 items-center">
                <Logo></Logo>
                <NavPanel wrapper={"Navpanel  gap-6 items-center font-medium pr-4 hidden md:flex"}
                    NavStyle={"hover:text-blue-600 transition-colors"}
                    btn={"p-3 rounded-md bg-violet-800 text-white font-medium text-sm"}
                    user={user}
                    items={items}

                ></NavPanel>
                <Humberger setState={setState} state={state}></Humberger>
            </div>
        )
    }
    else {
        return (
            <Navmb setState={setState} state={state} user={user}></Navmb>
        )

    }


}

export function Logo() {
    return (
        <Link to={"/"}>
            <div className="Logo flex p-1 border-2 gap-1 rounded-md border-solid border-gray-800 cursor-pointer">
                <h1 className=" text-xl font-bold bg-sky-700 p-2 text-white rounded-md">
                    Eletro
                </h1>
                <h1 className="text-xl font-bold p-2">
                    Store
                </h1>
            </div>
        </Link>
    )
}
export function Humberger({ setState, state }) {
    return (
        <div className="humberger md:hidden" onClick={() => setState(!state)} >
            <GiHamburgerMenu className="w-[25px] h-[25px]"></GiHamburgerMenu>
        </div>
    )
}
function ProtectedAuth({children,user}) {
    const dispatch=useDispatch();
    if(user){
         return (
             <Link className={"p-3 rounded-md bg-red-800 text-white font-medium text-sm"} onClick={()=>{
                dispatch(SignOut());

            }}>  LOG OUT </Link>

         )
     }
     else{
         return( <>
         {children}
        </>)
     }
   

}
export function NavPanel({ wrapper, NavStyle, clickme, btn,user,items}) {
    console.log(user);
    
    const length= items?.length || 0;
    return (
        <div className={wrapper}>
            <NavLink to="/" className={NavStyle} onClick={clickme}>HOME</NavLink>
            <NavLink to="/productList" className={NavStyle} onClick={clickme}>PRODUCTS</NavLink>
            {/* <NavLink to="/contacts" className={NavStyle} onClick={clickme}> CONTACTS</NavLink> */}
            <NavLink to="/Myorders" className={NavStyle} >Order</NavLink>

            <ProtectedAuth user={user}>
            <Link className={btn} to={"/Login"}>  LOG IN</Link>

            </ProtectedAuth>



            <Link className={`p-4 md:p-3 rounded-md text-white bg-slate-800 font-medium md:text-sm text-base ${(user)?`hidden`:`flex`}`} to={"/SignUP"}>Register</Link>

            <NavLink to={"/cart"} className={`relative ml-3 p-3 ${(user==null)?`hidden`:`flex`} `} onClick={clickme}>
                <AiOutlineShoppingCart className=" w-[30px] h-[30px]"></AiOutlineShoppingCart>
                <h1 className=" absolute right-1 top-1 rounded-full flex items-start font-semibold w-[23px] h-[23px] justify-center bg-green-700 text-white">{(user)?length:0}</h1>
            </NavLink>
        </div>
    )
}