import {FaStar} from "react-icons/fa"
import {AiOutlineStar} from "react-icons/ai"
import {FaStarHalfAlt} from "react-icons/fa"
export default function Star({stars}) {
    let star=stars;
    for(let i=star;i>0;i--) {
        if(i>=1) {
            arr.push(<FaStar className="w-[100%] h-[100%]"></FaStar>)
        }
        else{
            if(i>0 && i<1) {
                arr.push(<FaStarHalfAlt className="w-[100%] h-[100%]"></FaStarHalfAlt>)
            }
          
        }
}
console.log(Math.floor(5-stars))
for (let i=Math.floor(5-star);i>0;i--) {
    
    arr.push(<AiOutlineStar className="w-[100%] h-[100%]"/>)
}
console.log(arr)
return(
    <div className="star flex gap-1 w-[30%] h-[30%]">
        {
            arr.map((vl)=>{
                return(
                    vl
                )
            })
        }
    </div>
)
}