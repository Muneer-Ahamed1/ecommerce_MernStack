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
    const[dropDown,setDropDown]=useState(false);
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
                    dropDown={dropDown}
                    setDropDown={setDropDown}

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
export function NavPanel({ wrapper, NavStyle, clickme, btn,user,items,dropDown,setDropDown}) {
    console.log(user);
    
    const length= items?.length || 0;
    return (
        <div className={wrapper}>
            <NavLink to="/" className={NavStyle} onClick={clickme}>HOME</NavLink>
            <NavLink to="/productList" className={NavStyle} onClick={clickme}>PRODUCTS</NavLink>
            {/* <NavLink to="/contacts" className={NavStyle} onClick={clickme}> CONTACTS</NavLink> */}
{/* {                <NavLink to="/Myorders" className={`${NavStyle} ${(user==null)?`hidden`:`flex`}`} >Order</NavLink> */}
<div class={`hs-dropdown relative ${(user==null)?`hidden`:`inline-flex`} `}>
  <div id="hs-dropdown-default" type="button" class="hs-dropdown-toggle  px-4 inline-flex items-center gap-x-2 text-sm font-medium  text-gray-800  "
  onClick={(e)=>{
    setDropDown(!dropDown);
  }}
  >
    USER PROFILE
    <svg class="hs-dropdown-open:rotate-180 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </div>

  <div class={`hs-dropdown-menu absolute top-10 z-20 transition-[opacity,margin] flex flex-col duration ${dropDown?`opacity-100`:`opacity-0`} min-w-[15rem] bg-white shadow-md rounded-lg p-2 `}
  onClick={()=>{
    setDropDown(false);
  }}
  
>
    <NavLink class={`flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm ${NavStyle}`} to={"/userProfile"}>
         PROFILE
    </NavLink>
    <NavLink class={`flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm ${NavStyle}`} to={"/Myorders"}>
    ORDERS
    </NavLink>
   
  </div>
</div>
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