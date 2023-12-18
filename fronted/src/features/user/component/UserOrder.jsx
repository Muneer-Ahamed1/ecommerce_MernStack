import React, { useEffect } from 'react'
import {fetchUserOrderAsync} from "../userSlice";
import { useDispatch,useSelector } from 'react-redux';
import formalPrice from '../../../formalPrice'

export default function UserOrder() {
const dispatch=useDispatch();
const userLogin=useSelector((state)=>state.Auth.isLoginUser);
    useEffect(()=>{
      console.log(userLogin)
        dispatch(fetchUserOrderAsync(userLogin.id));




},[])
const orders=useSelector((state)=>state.User.userOrder);
//{totalCount,totalPrice,products,selectAddress,paymentMethod,user,status:"pending"}
console.log(orders);
    return (

      <div>
      {orders && orders.map((order) => (
        <div key={order.id}>
          <div>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Order # {order.id}
                </h1>
                <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                  Order Status : {order.status}
                </h3>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order.products.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                
                                <a href={item.id}>{item.title}</a>
                              </h3>
                              <p className="ml-4">{formalPrice(item.price)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty :{item.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {order.totalPrice}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{order.totalCount} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address :
                </p>
                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectAddress.fullName}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.address}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.pin}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                   
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
       {status === 'loading' ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    </div>
  )
}

