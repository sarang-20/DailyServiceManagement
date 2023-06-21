import React from 'react'
import { useState } from 'react';
function ForgotPass  ()  {
    const [error, setError] = useState("");
  
    const [Data, setData] = useState({ 
        
        email: "", 
        });
      const handleChange=({ currentTarget : input })=>{
    
        setData({ ...Data, [input.name]: input.value });
    
      }
      const handleSubmit= async (e)=>
      {
        console.log("handle")
        e.preventDefault();
        try {
          const { email } = Data;
          const res = await fetch("/forgotpass", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              
              email,
             
            }),
          });
          const mes=res.json();
          if(mes.error){
            setError(mes.error);
          }else{
            window.location.href = "/Checkmail";
          }
        }
        catch(err)
        {
              console.log(err);
        }
      }
  return (
    <div>
        <div
  class="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
  <form onSubmit={handleSubmit}>
    <div class="relative mb-12" data-te-input-wrapper-init>
    <input type="email" name="email" id="email"  onChange={handleChange} value={Data.email} required classNameName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
            
      <label
        for="exampleInputEmail1"
        class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
        >Email address</label
      >
      <small
        id="emailHelp"
        class="absolute w-full text-neutral-500 dark:text-neutral-200"
        data-te-input-helper-ref
        >We'll never share your email with anyone else.</small
      >
    </div>
   
    <div class="mb-6 block min-h-[1.5rem] pl-[1.5rem]">
      <input
        class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
        type="checkbox"
        value=""
        id="checkboxDefault" />
      <label
        class="inline-block pl-[0.15rem] hover:cursor-pointer"
        for="checkboxDefault">
        Check me out
      </label>
    </div>
    <button
      type="submit" value="submit"
      class="rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
      data-te-ripple-init
      data-te-ripple-color="light">
      Submit
    </button>
  </form>
</div>
   </div>
  );
}
export default ForgotPass;