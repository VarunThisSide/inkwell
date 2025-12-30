import { useEffect, useState } from "react"
import { BlogCard } from "../components/BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { MutatingDots } from "react-loader-spinner"

type Blog={
  id : string
  author : {
    name : string
  }
  title : string
  content : string
  postDate : Date
}
export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    const f=async ()=>{
      try{
        setLoading(true)
        const res=await axios.get(`${BACKEND_URL}/api/v1/post/bulk`,{
          headers : {
            Authorization : 'Bearer '+localStorage.getItem('token')
          }
        })
        setBlogs(res.data.allPosts)
      }catch(e){
        navigate('/signin')
      }finally{
        setLoading(false)
      }
    }
    f()
  }, [])
  console.log(blogs)
  return (
    <div className="">
      <AppBar authorName={localStorage.getItem('name') || 'User'} state="home"/>
      {blogs.map((value)=>{
        return(
          <BlogCard key={value.id} id={value.id} authorName={value.author.name} postDate={ value.postDate} title={value.title} content={value.content}/>
        )
      })}
      {loading && <div className="top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center fixed z-50">
        <MutatingDots color="#00a63e" secondaryColor="#00a63e"/>
      </div>}
    </div>
  )
}