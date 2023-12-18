import formatPrice from "../../../formalPrice"
import { Link } from "react-router-dom"
export default function Product({id,title,thumbnail,rating,images,category,discountPercentage,stock,price,data}) {
    return (
        <Link className="product h-[30vh]" to={`/detail/${id}`} >
        <div className="border-2 border-slate-100 p-2 rounded-md h-[100%] ">
            <div className="card h-[100%]">
                <div className="img relative h-[80%]">
                    <img src={thumbnail} alt="NOT FOUND" className="h-[100%] w-[100%] object-cover"/>
                    <h1 className="absolute top-3 right-1 bg-slate-50 px-4 py-2 rounded-full">{category}</h1>
                </div>
                <div className="data flex justify-between p-2">
                    <h1 className=" text-base">{title}</h1>
                    <h2>{formatPrice(price)}</h2>

                </div>
            </div>
        </div>
        </Link>

    )
}