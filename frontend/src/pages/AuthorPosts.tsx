import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { useParams } from "react-router-dom"
import {BlogCard} from "../components/BlogCard"
import type { BlogType } from "./Blogs"
import { ArrowLeftToLineIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const AuthorPosts = () => {
  const params=useParams()
  const navigate=useNavigate()
  const authorId=params.id
  const [authorPosts, setAuthorPosts] = useState<BlogType[]>([])
  useEffect(() => {
    const f = async () => {
      const res=await axios.get(`${BACKEND_URL}/api/v1/user/posts/${authorId}`,{
        headers : {
          Authorization : 'Bearer '+localStorage.getItem('token')
        }
      })
      setAuthorPosts(res.data.authorPosts)
    }
    f()
  },[])
  return (
    <>
      <ArrowLeftToLineIcon onClick={()=>{navigate('/blogs')}} size={50} className="mx-[1vw] my-2 cursor-pointer hover:scale-75 transition"/>
      {authorPosts.map((value)=>{
        return(
          <BlogCard key={value.id} authorId={value.author.id} id={value.id} authorName={value.author.name} postDate={value.postDate} title={value.title} content={value.content}/>
        )
      })}
    </>
  )
}