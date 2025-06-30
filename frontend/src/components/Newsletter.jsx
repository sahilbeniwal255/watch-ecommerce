import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col gap-6 items-center justify-center mt-10 mb-20'>
        <h1>SUBSCRIBE TO NEWSLETTER</h1>
        <form className='flex gap-0'>
          <input type = 'text' placeholder = 'Enter your email' className='border-2 border-solid border-black h-[40px] p-4' required></input>
          <button type = 'submit' onClick={(e) => {e.preventDefault();}} className='bg-black text-white p-2'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newsletter