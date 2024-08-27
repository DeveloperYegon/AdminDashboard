import React from 'react'
import Home from "../src/Pages/Home.jsx"
import Navbar from '../src/Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Projects from './Pages/Projects.jsx'
import Notifications from './Pages/Notifications.jsx'
import Blog from './Pages/Blog.jsx'
import Recruit from './Pages/Recruit.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/add-blog' element={<Blog/>}/>
        <Route path='/add-project' element={<Projects/>}/>
        <Route path='/add-admin' element={<Recruit/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  )
}

export default App