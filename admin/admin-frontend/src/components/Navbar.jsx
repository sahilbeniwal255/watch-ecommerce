import React from 'react'

const Navbar = (props) => {
  const {setToken} = props;
  return (
    <div className='flex border-b-2 border-b-black bg-black text-white text-xl w-full justify-between m-0 p-3 h-fit'>
    <h1>HERMAN ADMIN PANEL</h1>
    <button onClick={() => setToken('')} className='bg-black text-sm text-white hover:text-black hover:bg-white pl-4 pr-4'><p>Log Out</p></button>
    </div>
  )
}

export default Navbar