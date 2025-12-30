import { useEffect, useState } from "react"
import { ArrowLeftToLineIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ToastContainer , toast } from "react-toastify"
import { BlogEditorSkeleton } from "../components/BlogEditorSkeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { MutatingDots } from "react-loader-spinner"

export const CreateEditPost = ({type} : { type : 'create' | 'edit' }) => {
  const navigate=useNavigate()
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [published, setPublished] = useState(false)
  const params=useParams()
  useEffect(()=>{
    if(type==='edit'){
      const postId=params.id
      const f=async ()=>{
        setLoading(true)
        const res=await axios.get(`${BACKEND_URL}/api/v1/post/${postId}`,{
          headers : {
            Authorization : 'Bearer '+localStorage.getItem('token')
          }
        })
        const userId=res.data.userId
        const authorId=res.data.post.author.id
        if(authorId !== userId){
          navigate('/blogs')
        }
        else{
          setTitle(res.data.post.title)
          setContent(res.data.post.content)
        }
        setLoading(false)
      }
      f()
    }
  },[])
  return (
    <>
      <div className="flex items-center justify-between px-[2vw]">
        <ArrowLeftToLineIcon onClick={()=>{navigate('/blogs')}} size={50} className="mx-[1vw] my-2 cursor-pointer hover:scale-75 transition"/>
        <div className="transition cursor-pointer hover:drop-shadow-xl mx-2 bg-green-600 text-white px-4 py-1 rounded-full" onClick={async ()=>{
          try{
            setPublished(true)
            setLoading(true)
            if(type==='create'){
              var res=await axios.post(`${BACKEND_URL}/api/v1/post`,{title,content},{
                headers : {
                  Authorization : 'Bearer '+localStorage.getItem('token')
                }
              })
              toast.success('Post published!')
              setTimeout(() => {
                navigate(`/blog/${res.data.postId}`)
              }, 1000);
            }
            else{
              var res=await axios.put(`${BACKEND_URL}/api/v1/post/${params.id}`,{title,content},{
                headers : {
                  Authorization : 'Bearer '+localStorage.getItem('token')
                }
              })
              toast.success('Post published!')
              setTimeout(() => {
                navigate(`/blog/${params.id}`)
              }, 1000);
            }
          }catch(e){
            toast.error('How can your post be without title or content?')
          }finally{
            setLoading(false)
            setPublished(false)
          }
        }}>
          Publish
        </div>
      </div>
      {loading && !published ? <BlogEditorSkeleton/> : <div className="px-[15vw]">
        <input placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}} value={title} className="my-1 block text-6xl focus:outline-none  min-w-2/3 w-full"/>
        <textarea placeholder="Time to tell a story . . ." onChange={(e)=>{setContent(e.target.value)}} value={content} className="min-h-[200vh] my-1 text-gray-700 text-xl focus:outline-none w-full p-3 border-0 rounded-2xl"/>
      </div>}
      {loading && published && <div className="top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center fixed z-50">
        <MutatingDots color="#00a63e" secondaryColor="#00a63e"/>
      </div>}
      <ToastContainer/>
    </>
  )
}