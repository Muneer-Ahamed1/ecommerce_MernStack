import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link, NavLink } from "react-router-dom"
import {GiHamburgerMenu} from "react-icons/gi"
import { useState } from "react"
import { useSelector } from "react-redux"
import {RxCross2} from "react-icons/rx"


export default function Navbar() {
    const[state,setState]=useState(true);
    console.log(state)
        
            if(state) {
                return(
        <div className="Navbar  bg-gray-50 flex justify-between py-2 px-8 items-center">
            <Logo></Logo>
            <NavPanel wrapper={"Navpanel  gap-6 items-center font-medium pr-4 hidden md:flex"}
            NavStyle={"hover:text-blue-600 transition-colors"}
            btn={"p-3 rounded-md bg-violet-800 text-white font-medium text-sm"}
            
            ></NavPanel>
            <Humberger setState={setState} state={state}></Humberger>
        </div>
        )
    }
    else{
        return(
            <Navmb setState={setState} state={state}></Navmb>
        )

    }
    

}

export function Logo() {
    return (
        <div className="Logo flex p-1 border-2 gap-1 rounded-md border-solid border-gray-800 cursor-pointer">
            <h1 className=" text-xl font-bold bg-sky-700 p-2 text-white rounded-md">
                Eletro
            </h1>
            <h1 className="text-xl font-bold p-2">
                Store
            </h1>
        </div>
    )
}
export function Humberger({setState,state}) {
    return (
        <div className="humberger md:hidden" onClick={()=>setState(!state)} >
            <GiHamburgerMenu className="w-[25px] h-[25px]"></GiHamburgerMenu>
        </div>
    )
}
export function NavPanel({wrapper,NavStyle,clickme,btn}) {
    const length=3 //useSelector((val)=>val.Cart.addToCart).length;
    console.log(length)
    return (
        <div className={wrapper}>
            <a to="/" className={NavStyle} onClick={clickme}>HOME</a>
            <a to="/about" className={NavStyle} onClick={clickme}>ABOUT</a>
            <a to="/product" className={NavStyle} onClick={clickme}>PRODUCTS</a>
            <a to="/contacts" className={NavStyle} onClick={clickme}> CONTACTS</a>
            <a  className={btn}> LOG IN</a>

            <a to={"/cart"} className="relative ml-3 flex p-3" onClick={clickme}>
                <AiOutlineShoppingCart className=" w-[30px] h-[30px]"></AiOutlineShoppingCart>
                <h1 className=" absolute right-1 top-1 rounded-full flex items-start font-semibold w-[23px] h-[23px] justify-center bg-green-700 text-white">{length}</h1>
            </a>
        </div>
    )
}




export  function Navmb({setState,state}) {
    function clickme(){
        setState(!state)
    }
    return(
        <div className="Navmb flex flex-col p-[1rem] h-[100vh]">
            <RxCross2 className="sm:w-[30px] sm:h-[30px] ml-[auto] mr-[1rem] h-[25px] w-[25px]"
            onClick={()=>setState(!state)}
            ></RxCross2>
            <NavPanel wrapper={"flex flex-col items-center my-[auto] gap-[2rem]"}
            NavStyle={"hover:text-blue-600 transition-colors font-medium text-xl sm:text-2xl"}
            clickme={clickme}
            btn={"py-3 px-5 rounded-md bg-violet-800 text-white font-bold text-base"}
            
            ></NavPanel>


        </div>
    )
}