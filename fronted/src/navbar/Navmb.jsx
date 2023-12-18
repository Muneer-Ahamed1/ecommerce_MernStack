import {RxCross2} from "react-icons/rx"
import { NavPanel } from "./Navbar"
export default function Navmb({setState,state,user}) {
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