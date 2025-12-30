import { useState } from "react"
import { ArrowLeftToLineIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { MutatingDots } from "react-loader-spinner"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ToastContainer , toast } from "react-toastify"

export const CreatePost = () => {
  const navigate=useNavigate()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className="flex items-center justify-between px-[2vw]">
        <ArrowLeftToLineIcon onClick={()=>{navigate('/blogs')}} size={50} className="mx-[1vw] my-2 cursor-pointer hover:scale-75 transition"/>
        <div className="transition cursor-pointer hover:drop-shadow-xl mx-2 bg-green-600 text-white px-4 py-1 rounded-full" onClick={async ()=>{
          try{
            setLoading(true)
            const res=await axios.post(`${BACKEND_URL}/api/v1/post`,{title,content},{
              headers : {
                Authorization : 'Bearer '+localStorage.getItem('token')
              }
            })
            toast.success('Post published!')
            setTimeout(() => {
              navigate(`/blog/${res.data.postId}`)
            }, 1000);
          }catch(e){
            toast.error('Something went wrong!')
          }finally{
            setLoading(false)
          }
        }}>
          Publish
        </div>
      </div>
      <div className="px-[15vw]">
        <input placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}} className="my-1 block text-6xl focus:outline-none  min-w-2/3 w-full"/>
        <textarea placeholder="Time to tell a story . . ." onChange={(e)=>{setContent(e.target.value)}} className="my-1 text-gray-700 text-xl focus:outline-none w-full p-3 border-0 hover:border border-gray-400 rounded-2xl"/>
      </div>
      {loading && <div className="top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center fixed z-50">
        <MutatingDots color="#00a63e" secondaryColor="#00a63e"/>
      </div>}
      <ToastContainer/>
    </>
  )
}