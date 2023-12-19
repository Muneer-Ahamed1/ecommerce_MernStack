import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch,useSelector } from 'react-redux'
import { ForgotPasswordAsync } from '../authSlice'

export default function Forgotpassword() {

    
    const {register,handleSubmit,watch,formState: { errors }, } = useForm()
    const dispatch=useDispatch();
    const onSubmit = (data) =>{
        console.log(data)
        dispatch(ForgotPasswordAsync(data));
    }
    const forgotPassword=useSelector((state)=>state.Auth.ForgotUser);
    console.log(forgotPassword);

  return (
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password  to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                 <p className=' text-red-600'>{errors.email && errors.email.message +'*'}</p> 
              </div>
              <div>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 Reset Password 
                </button>
                              </div>
              </form>
              </div>
              </div>
                )
}

