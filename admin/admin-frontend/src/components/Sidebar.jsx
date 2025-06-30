import React from 'react'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
        <div className='flex flex-col gap-2 border-r-2 border-r-black w-[120px] sm:w-[148px] h-screen'>
            <NavLink className = 'border-2 border-black pl-1 p-2 pr-6 ml-3 sm:ml-10 mt-4 w-28 bg-white' to = './list'><p>List Items</p></NavLink>
            <NavLink className = 'border-2 border-black pl-1 p-2 pr-6 ml-3 sm:ml-10 w-28 bg-white' to = './add'><p>Add Items</p></NavLink>
            <NavLink className = 'border-2 border-black pl-1 p-2 pr-6 ml-3 sm:ml-10 w-28 bg-white' to = './order'><p>Order</p></NavLink>
        </div>
    </>
  )
}

export default Sidebar