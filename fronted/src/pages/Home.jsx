import React from 'react'
import Hero from "../assets/HeroPic.jpg"

export default function HeroSection({name}) {
  return (
  <div className="relative w-full bg-white md:min-h-[80vh] h-[100%] grid items-center">
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 h-[100%] items-center justify-center grid  ">
      <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
       
       
        <h1 className="mt-8 sm:text-3xl ext:text-xl font-bold tracking-tight text-black md:text-5xl lg:text-5xl w-[100%]">
          WELCOME TO {"Eletro Store"}
        </h1>
        <p className="mt-8 ext:text-base sm:text-lg text-gray-700">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque nihil in, ipsa sapiente, ratione ea quae eligendi impedit libero dolores commodi exercitationem veritatis qui aperiam deleniti ex. Consectetur, dolores consequuntur?
        </p>
       
      </div>
      <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6 grid content-center p-3 sm:p-[3rem] items-center justify-center">
        <img
          className=" bg-gray-50 object-cover sm:h-[100%] sm:w-[100%] "
          src={Hero}
          alt=""
        />
      </div>
    </div>
  </div>
)
}
