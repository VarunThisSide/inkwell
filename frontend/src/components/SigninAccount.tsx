import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from "react-hook-form"
import type { SigninInput } from "@varunthisside/inkwell-common"
import { ToastContainer , toast } from "react-toastify"
import axios from 'axios'
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { MutatingDots } from "react-loader-spinner"
import { useState } from "react"

export const SigninAccount = () => {
  const {
  register,
  handleSubmit,
  } = useForm<SigninInput>()
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const onSubmit : SubmitHandler<SigninInput>=async (data)=>{
    setLoading(true)
    try{
      const res=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,data)
      localStorage.setItem('token' , res.data.token)
      toast.success(res.data.msg)
      navigate('/blogs')
    }catch(e : any){
      toast.error(e.response.data.msg)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center md:w-[50vw]">
      <div className="text-4xl my-2 font-bold">
        Sign in to your account
      </div>
      <div className="text-slate-500 my-2">
        Don't have an account? <Link to='/signup' className="underline">Signup</Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3">
        <div className="my-1">
          Email
        </div>
        <input {...register('email')} placeholder="john@gmail.com" className="inline rounded-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand w-full px-5 py-2 shadow-xs"/>
        <div className="my-1">
          Password
        </div>
        <input {...register('password')} type="password" placeholder="Your password" className="inline rounded-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand w-full px-5 py-2 shadow-xs"/>
        <div className="flex justify-center items-center">
          <input type="submit" value={"Submit"} className="text-white bg-black my-4 box-border border border-transparent hover:bg-gray-800 focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-2xl px-6 text-sm py-3 focus:outline-none cursor-pointer"/>
        </div>
      </form>
      <ToastContainer/>
      {loading && <div className="top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center fixed z-50">
        <MutatingDots color="#00a63e" secondaryColor="#00a63e"/>
      </div>}
    </div>
  )
}