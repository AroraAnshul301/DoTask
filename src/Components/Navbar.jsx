import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-around bg-blue-900 text-white items-center p-4'>
        <div className="logo">
            <span className='font-bold text-xl cursor-pointer'>DoTask</span>
        </div>
        <ul className='flex gap-4'>
            <li className='cursor-pointer hover:scale-105 hover:bg-blue-950 rounded-md  transition-all duration-100 p-1.5'>Home</li>
            <li className='cursor-pointer hover:scale-105  hover:bg-blue-950 rounded-md  transition-all duration-100 p-1.5'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
