import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const AppBar = ({ authorName , authorId} : { authorName : string ,authorId : string }) => {
  const navigate=useNavigate()
  return (
    <>
    <div className="flex items-center justify-between px-8 py-2 shadow-2xl shadow-gray-500 bg-gray-200 sticky top-0 mb-8">
      <div className="flex items-center">
        <div className="mx-1 flex justify-center items-center bg-amber-950 text-white p-2 rounded-full h-10 w-10">
          {authorName.charAt(0).toUpperCase()}
        </div>
        <div>
          {authorName}
        </div>
      </div>
      <div className="flex items-center">
        <div onClick={()=>{navigate(`/authorposts/${authorId}`)}} className="border-2 border-black px-3 py-1 rounded-full transition cursor-pointer hover:shadow-xl">
          My Posts
        </div>
        <div onClick={()=>{navigate('/createpost')}} className="transition cursor-pointer hover:drop-shadow-xl mx-2 bg-green-600 text-white px-4 py-1 rounded-full">
          Create Post
        </div>
        <div className="mx-2 cursor-pointer hover:scale-75 transition" onClick={()=>{
          localStorage.clear()
          navigate('/signin')
        }}>
          <LogOut/>
        </div>
      </div>
    </div>
    </>
  )
}