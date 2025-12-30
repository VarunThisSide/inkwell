import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ArrowLeftToLineIcon, PencilLine } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { BlogType } from "./Blogs"
import { BlogPageSkeleton } from "../components/BlogPageSkeleton"
import 'react-loading-skeleton/dist/skeleton.css'

function Blog() {
  const {id}=useParams()
  const [blog,setBlog]=useState<BlogType>({
    id : "",
    author: {
      name: "",
      id : ""
    },
    title: "",
    content: "",
    postDate: new Date("2025-12-29T10:00:00Z"),
  })
  const [loading, setLoading] = useState(false)
  const [userId,setUserId]=useState()
  const navigate=useNavigate()
  useEffect(()=>{
    const f=async ()=>{
      try{
        setLoading(true)
        const res=await axios.get(`${BACKEND_URL}/api/v1/post/${id}`,{
          headers : {
            Authorization : 'Bearer '+localStorage.getItem('token')
          }
        })
        setBlog(res.data.post)
        setUserId(res.data.userId)
      }catch(e){
        
      }finally{
        setLoading(false)
      }
    }
    f()
  },[])
  return (
    <>
    <div className="flex justify-between items-center px-[2vw]">
      <ArrowLeftToLineIcon onClick={()=>{navigate('/blogs')}} size={50} className="mx-[1vw] my-2 cursor-pointer hover:scale-75 transition"/>
      {userId===blog.author.id && <div onClick={()=>{navigate(`/editpost/${blog.id}`)}} className="flex justify-center items-center gap-2 transition cursor-pointer hover:drop-shadow-xl mx-2 bg-green-600 text-white px-4 py-1 rounded-full">
        <PencilLine size={20}/>
        Edit
      </div>}
    </div>
    {loading? <BlogPageSkeleton/> : <div className="flex px-[5vw] py-8">
      <div className="w-[70%] flex flex-col">
        <div className="font-bold md:text-7xl text-3xl my-2">
          {blog?.title}
        </div>
        <div className="text-gray-500 my-2 ">
          Posted on {new Date(blog?.postDate).toLocaleString('default' , {month : 'short'})+' '+new Date(blog?.postDate).getDate()+', '+new Date(blog?.postDate).getFullYear()}
        </div>
        <div className="text-gray-800 px-4">
          {blog?.content}
        </div>
      </div>
      <div className="w-px bg-gray-300 min-h-[75vh]"></div>
      <div className="w-[30%] flex flex-col px-[5vw]">
        <div className="my-4">
          Author
        </div>
        <div className="flex">
          <div className="mr-1 flex justify-center items-center bg-amber-950 text-white p-2 rounded-full h-8 w-8">
            {blog?.author.name.charAt(0).toUpperCase()}
          </div>
          <div onClick={()=>{navigate(`/authorposts/${blog.author.id}`)}} className="cursor-pointer text-xl mx-2 font-bold hover:underline">
            {blog?.author.name}
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default Blog