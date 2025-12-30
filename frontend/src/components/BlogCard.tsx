import { useNavigate } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

export type BlogType = {
  id : string
  authorName: string
  postDate: Date
  title: string
  content: string
  authorId : string
}
export const BlogCard = ({
  id,
  authorName,
  postDate,
  title,
  content,
  authorId
}: BlogType) => {
  const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={()=>{navigate(`/blog/${id}`)}}>
      <div className="min-w-3/4 m-4 hover:bg-gray-100 transition-all px-4 py-2 rounded-4xl">
        <div className="flex items-center ">
          <div className="mx-1 flex justify-center items-center bg-amber-950 text-white p-2 rounded-full h-8 w-8">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div onClick={(e)=>{
            e.stopPropagation()
            navigate(`/authorposts/${authorId}`)}} className="hover:underline">
            {authorName} &middot;
          </div>
          <div className="text-gray-400 mx-1">
            {new Date(postDate).toLocaleString('default' , {month : 'short'})+' '+new Date(postDate).getDate()+', '+new Date(postDate).getFullYear()}
          </div>
        </div>
        <div className="text-3xl font-bold mb-3">
          {title}
        </div>
        <div className="text-gray-600 mb-3">
          {content.slice(0,100)} {content.length>100?'...':''}
        </div>
        <div className="bg-gray-200 w-fit px-3 rounded-full text-sm">
          {Math.ceil(content.length/100)} min read
        </div>
        <div className="bg-gray-100 h-0.5 w-4/5 mt-4"></div>
      </div>
    </div>
  )
}