import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from "react-hook-form"
import type { SignupInput } from "@varunthisside/inkwell-common"

export const CreateAccount = () => {
  const {
  register,
  handleSubmit,
  } = useForm<SignupInput>()

  const onSubmit : SubmitHandler<SignupInput>=(data)=>{
    console.log(data)
  }

  return (
    <div className="flex flex-col justify-center items-center md:w-[50vw]">
      <div className="text-4xl my-2 font-bold">
        Create an account
      </div>
      <div className="text-slate-500 my-2">
        Already have an account? <Link to='/signin' className="underline">Login</Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3">
        <div className="my-1">
          Email
        </div>
        <input {...register('email')} placeholder="john@gmail.com" className="inline rounded-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand w-full px-5 py-2 shadow-xs"/>
        <div className="my-1">
          Name
        </div>
        <input {...register('name')} placeholder="John Doe" className="inline rounded-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand w-full px-5 py-2 shadow-xs"/>
        <div className="my-1">
          Password
        </div>
        <input {...register('password')} type="password" placeholder="Your password" className="inline rounded-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand w-full px-5 py-2 shadow-xs"/>
        <div className="flex justify-center items-center">
          <input type="submit" value={"Submit"} className="text-white bg-black my-4 box-border border border-transparent hover:bg-gray-800 focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-2xl px-6 text-sm py-3 focus:outline-none cursor-pointer"/>
        </div>
      </form>
    </div>
  )
}