import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateUserAsync } from "../auth/authSlice";
import { fetchItemsByUserIdAsync, selectItems, selectCartLoaded, selectCartStatus, deleteItemFromCartAsync } from "../cart/cartSlice"
import { useForm } from "react-hook-form"
import {createOrderAsync} from "../order/orderSlice"








export function ModalShipping({ modalState, setModalState }) {
    const [open, setOpen] = useState(modalState)

    console.log("open +", open)
    const cancelButtonRef = useRef(null)
    useEffect(() => { setOpen(modalState) }, [modalState])
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div >

                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Address Submition
                                            </Dialog.Title>
                                            <form className="mt-2" onSubmit={(e) => console.log(e.target)}>

                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Enter your Full name"
                                                        id="name"
                                                    ></input>
                                                </div>



                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Address
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Enter your  Address"
                                                        id="name"
                                                    ></input>
                                                </div>


                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        City
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Enter your City "
                                                        id="name"
                                                    ></input>
                                                </div>



                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Pincode
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Enter your pincode"
                                                        id="name"
                                                    ></input>
                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                                        onClick={() => setModalState(false)}
                                        onSubmit={(e) => console.log(e.target)}

                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setModalState(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}








export default function Checkout() {
    const dump = useSelector((state) => state.Auth.isLoginUser);
    const address = dump && dump.address;
    const [selectAddress, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const products = useSelector(selectItems);
    let totalPrice=products && products.reduce((total,vl)=>{
        total=total+vl.price
        return total;
    },0)
    const navigate=useNavigate();
    let totalCount=products && products.length
    const status = useSelector(selectCartStatus);
    const cartLoaded = useSelector(selectCartLoaded)
    console.log(products)
    const [modalState, setModalState] = useState(false);

    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm()
    const user = useSelector((state) => state.Auth.isLoginUser);

    const onSubmit = (data) => {
        console.log(user);
        let dump;
        if(user.address) {
        
         dump = { ...user, address: [...user?.address, data] };
      
        }
        else{
             dump = { ...user, address: [data] };
        }
        dispatch(updateUserAsync(dump));
        reset();
    }
    function paymentFun(e){
        setPaymentMethod(e.target.value);
    }
    function addressFun(e){
        const index=e.target.value;
        
        setAddress({...user.address[index]});

    }
    function paymentButton() {
        if(selectAddress && paymentMethod) {
            const order={totalCount,totalPrice,products,selectAddress,paymentMethod,user,status:"pending"};
            dispatch(createOrderAsync(order));
            navigate(`/order/${user.id}`);
            
        }
    }

    useEffect(() => {
        dispatch(fetchItemsByUserIdAsync(user));

    }, [deleteItemFromCartAsync])

    
        
   
    return (
        <>
            {!products.length && cartLoaded && <Navigate to="/productList" replace={true}></Navigate>}

            <div className="mx-auto my-4 max-w-4xl md:my-6">
                <div className="overflow-hidden  rounded-xl shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Contact Info */}
                        <div className="px-5 py-6 text-gray-900 md:px-8">
                            <div className="flow-root">
                                <div className="-my-6 divide-y divide-gray-200">
                                    <div className="py-6">
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                            <div>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <h3
                                                        id="contact-info-heading"
                                                        className="text-lg font-semibold text-gray-900"
                                                    >
                                                        Personal information
                                                    </h3>

                                                    <div className="mt-4 w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="name"
                                                        >
                                                            Full Name
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="text"
                                                            placeholder="Enter your name"
                                                            {...register("fullName", {
                                                                required: "Enter Your Name",
                                                                minLength: 5,
                                                            })}
                                                            id="fullName"
                                                            name='fullName'
                                                        ></input>
                                                        {console.log(errors)}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Email address
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                type='input'
                                                                autoComplete="email"
                                                                placeholder='Enter the email'
                                                                {...register("email", {
                                                                    required: "Enter the email", // Error message for required field
                                                                    pattern: {
                                                                        value: /([\w.-]+)?\w+@[\w-]+(\.\w+){1,}/igm,
                                                                        message: "Validation mismatch", // Error message for pattern validation
                                                                    },
                                                                })}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                        {console.log(errors)}
                                                        <p className=' text-red-600'>{errors.email && errors.email.message + '*'}</p>
                                                    </div>



                                                    <div className="mt-4 w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="name"
                                                        >
                                                            Country
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="text"
                                                            placeholder="Enter your Country"
                                                            id="country"
                                                            name='country'
                                                            {...register("country", {
                                                                required: "Country is Required"
                                                            })}

                                                        ></input>
                                                    </div>
                                                    <div className="mt-4 w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="name"
                                                        >
                                                            Address
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="text"
                                                            placeholder="Enter your  Address"
                                                            id="address"
                                                            name='address'
                                                            {...register("address", { required: "Address required" })}
                                                        ></input>
                                                    </div>


                                                    <div className="mt-4 w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="name"
                                                        >
                                                            City
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="text"
                                                            placeholder="Enter your City "
                                                            id="city"
                                                            name='city'
                                                            {...register("city", { required: "City required" })}

                                                        ></input>
                                                    </div>



                                                    <div className="mt-4 w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="name"
                                                        >
                                                            Pincode
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="text"
                                                            placeholder="Enter your pincode"
                                                            id="pin"
                                                            name="pin"
                                                            {...register("pin", { required: "PinCode required" })}

                                                        ></input>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"


                                                        >
                                                            Add
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={()=>reset()}
                                                        >
                                                            Reset
                                                        </button>
                                                    </div>
                                                </form>

                                                <hr className="my-8" />
                                                <div className="mt-10">
                                                    <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>
                                                    <div className='flex flex-row items-center justify-between'>
                                                        <div className="first-div">

                                                            {
                                                                address && (address.length > 0) ? (
                                                                    <h1 className='text-gray-400 font-medium'>Please select a address from below </h1>

                                                                ) : (
                                                                    <h1 className='text-gray-500 font-medium '>Please add new address.we don't have any previous address of yours</h1>
                                                                )
                                                            }
                                                        </div>

                                                    </div>
                                                    <ModalShipping modalState={modalState} setModalState={setModalState}></ModalShipping>


                                                    {
                                                        address && (address.length > 0) ? (
                                                            <div>
                                                                {
                                                                    address.map((val, index) => {
                                                                        const { fullName, address, pin, city } = val;
                                                                        return (
                                                                            <div className='flex items-center gap-2' key={index} >
                                                                                <input type="radio" name="address"  value={index} onChange={(e)=>addressFun(e)} />
                                                                                <div className="wrapper flex items-center w-[100%] mx-2 justify-between">
                                                                                    <div className="first">
                                                                                        <h1>{fullName}</h1>
                                                                                        <h2>{pin}</h2>
                                                                                    </div>
                                                                                    <div className="second">
                                                                                        <h1>{address}</h1>
                                                                                        <h1>{city}</h1>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        ) : (
                                                            <h1 className=' text-xl font-medium '>Add some </h1>
                                                        )
                                                    }





                                                </div>
                                                <hr className="my-8" />
                                                <div className="mt-10">
                                                    <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>

                                                    <div className="mt-6 flex items-center">
                                                        <input type="radio" id="contactChoice1"
                                                            name="payment" value={"cash"} checked={paymentMethod == "cash"} 
                                                            onChange={(e)=>paymentFun(e)}
                                                            />
                                                        <div className="ml-2">

                                                            <label
                                                                htmlFor="same-as-shipping"
                                                                className="text-sm font-medium text-gray-900"
                                                            >
                                                                Cash
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 flex items-center">
                                                        <input type="radio" id="contactChoice1"
                                                            name="payment" value={"card"} checked={paymentMethod == "card"} 
                                                            onChange={(e)=>paymentFun(e)}
                                                            />
                                                        <div className="ml-2">

                                                            <label
                                                                htmlFor="same-as-shipping"
                                                                className="text-sm font-medium text-gray-900"
                                                            >
                                                                Card
                                                            </label>
                                                        </div>
                                                    </div>



                                                </div>

                                                <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                                    <button onClick={()=>paymentButton()}
                                                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                    >
                                                        Make payment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product List */}
                        <div className="bg-gray-100 px-5 py-6 md:px-8">
                            <div className="flow-root">
                                <ul className="-my-7 divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <li
                                            key={product.id}
                                            className="flex items-stretch justify-between space-x-5 py-7"
                                        >
                                            <div className="flex flex-1 items-stretch">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                                                        src={product.images[0]}

                                                    />
                                                </div>

                                            </div>

                                            <div className="ml-auto flex flex-col items-end justify-between">
                                                <p className="text-right text-sm font-bold text-gray-900">{product.title}</p>

                                            </div>
                                            <div className="ml-auto flex flex-col items-end justify-between">
                                                <p className="text-right text-sm font-bold text-gray-900">{product.price}</p>
                                                <button
                                                    onClick={() => {
                                                        console.log(product)
                                                        dispatch(deleteItemFromCartAsync(product.id))
                                                    }}
                                                    type="button"
                                                    className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                                >
                                                    <span className="sr-only">Remove</span>
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <hr className="mt-6 border-gray-200" />

                            <ul className="mt-6 space-y-3 bg-white p-4">

                                <li className="flex items-center justify-between text-gray-900">
                                    <p className="text-sm font-medium ">Total</p>
                                    <p className="text-sm font-bold ">₹1,14,399</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}




