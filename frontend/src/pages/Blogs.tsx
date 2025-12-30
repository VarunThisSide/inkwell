import { useEffect, useState } from "react"
import { BlogCard } from "../components/BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { BlogCardSkeleton } from "../components/BlogCardSkeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export type BlogType={
  id : string
  author : {
    name : string
    id : string
  }
  title : string
  content : string
  postDate : Date
}
export const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [user, setUser] = useState<{name : string , id : string}>()
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
        const sortedBlogs=res.data.allPosts.sort(
          (a : BlogType ,b : BlogType)=> new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
        )
        setBlogs(sortedBlogs)
        setUser({name : res.data.user.name , id : res.data.user.id})
      }catch(e){
        navigate('/signin')
      }finally{
        setLoading(false)
      }
    }
    f()
  }, [])
  return (
    <div className="">
      <AppBar authorName={user?.name || ''} authorId={user?.id || ''}/>
      {blogs.map((value)=>{
        return(
          <BlogCard key={value.id} authorId={value.author.id} id={value.id} authorName={value.author.name} postDate={ value.postDate} title={value.title} content={value.content}/>
        )
      })}
      {loading && <>
        <BlogCardSkeleton/>
        <BlogCardSkeleton/>
        <BlogCardSkeleton/>
      </>}
    </div>
  )
}