import { useEffect, useState } from "react"
import { BlogCard } from "../components/BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppBar"

export const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const navigate=useNavigate()
  useEffect(() => {
    const f=async ()=>{
      try{
        const res=await axios.get(`${BACKEND_URL}/api/v1/post/bulk`,{
          headers : {
            Authorization : 'Bearer '+localStorage.getItem('token')
          }
        })
        setBlogs(res.data.allPosts)
      }catch(e){
        navigate('/signin')
      }
    }
    f()
  }, [])
  
  return (
    <>
      <AppBar authorName={localStorage.getItem('name') || 'User'}/>
      {blogs.map((value : any, ind)=>{
        <BlogCard authorName={value.author.authorName} postDate={value.postDate} title={value.title} content={value.content}/>
      })}
      <BlogCard authorName="Varun" postDate={new Date()} title="My Story" content="Thats my storyy"/>
    </>
  )
}