import { useEffect , useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaBell } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";


function Navbar() {

  const [count, setCount] = React.useState(0);
  useEffect(() => {
    fetch('http://localhost:3002/requests')
  .then(response => response.json())
  .then(data => setCount(data.length))
  .catch(err => console.log(err));
  },[])

  return (
  <header className='sticky top-0 bg-[#fff] w-full'>
    <nav className='md:p-5 flex justify-around h-20 md:m-5 border shadow-lg border-slate-100 items-center'>
        <Link to="/">  
              <h1 className='md:text-xl hover:text-[#ED7D3B]'>DeveloperYegon</h1>
        </Link>

        <ul className='flex items-center '>
            <Link to="/notifications"><li className='p-3 md:text-xl hover:text-[#ED7D3B]'><FaBell /> 
            {/* <div className=' bg-black bottom-2 right-1  rounded-full p-1 relative text-[rgb(255,0,0)]'>{count}</div>  */}
            </li></Link>
            <Link to="/add-blog"><li className='md:p-3 md:text-xl hover:text-[#ED7D3B]'>BLogs</li></Link>
            <Link to="/add-project"><li className='p-3 md:text-xl hover:text-[#ED7D3B]'>Projects</li></Link>
            
        </ul>
        <div className='bg-[#ED7D3B] py-1 px-6 rounded-full'>
          <Link to="add-admin">
             <FaUserPlus className='hover:text-[#fff] ' title='Add Admin' />
          </Link>
        </div>
    </nav>
  </header>
  )
}

export default Navbar