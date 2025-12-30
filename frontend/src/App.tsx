import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { CreateEditPost } from './pages/CreateEditPost'
import { AuthorPosts } from './pages/AuthorPosts'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/' element={<Blogs/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/createpost' element={<CreateEditPost type='create'/>}/>
          <Route path='/editpost/:id' element={<CreateEditPost type='edit'/>}/>
          <Route path='/authorposts/:id' element={<AuthorPosts/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
