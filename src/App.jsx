import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import AddEditBlog from './pages/AddEditBlog'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path='/blogs' element={
        <ProtectedRoute>   <Blogs/> </ProtectedRoute>
        }/>
      <Route path='/add' element={
        <ProtectedRoute>    <AddEditBlog/> </ProtectedRoute>
        }/>
      <Route path='/edit/:id' element={
        <ProtectedRoute>       <AddEditBlog/>  </ProtectedRoute>
        }/>
    </Routes>
    </BrowserRouter>
  )
}

export default App