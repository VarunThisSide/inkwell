import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const AppBar = ({ authorName } : { authorName : string}) => {
  const navigate=useNavigate()
  return (
    <div className="flex items-center justify-between px-8 py-2">
      <div className="flex items-center">
        <div className="mx-1 flex justify-center items-center bg-amber-950 text-white p-2 rounded-full h-10 w-10">
          {authorName.charAt(0).toUpperCase()}
        </div>
        <div>
          {authorName}
        </div>
      </div>
      <div className="flex items-center">
        <div className="mx-2 bg-green-600 text-white px-4 py-1 rounded-full">
          Create Post
        </div>
        <div className="mx-2 cursor-pointer" onClick={()=>{
          localStorage.clear()
          navigate('/signin')
          }}>
          <LogOut/>
        </div>
      </div>
    </div>
  )
}