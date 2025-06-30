import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';

const Login = (props) => {
  const {setToken} = props;
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/adminLogin', {email, password});
      if(response.data.success){
        setToken(response.data.token);
      }else{
        alert(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
        <div className='w-fit border-black border-2 p-4 flex flex-col items-center gap-6'>
            <h1>Admin Panel</h1>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-3'>    
              <div className='flex gap-3 justify-between'><p>Email</p><input onChange={(e) => {setEmail(e.target.value)}} value = {email} className='border-black border-2 pl-2' type = 'text'/></div>
              <div className='flex gap-3 justify-between'><p>Password</p><input onChange={(e) => {setPass(e.target.value)}} value = {password} className='border-black border-2 pl-2' type = 'password'/></div>
              <button type='submit' className='bg-black mt-5 w-full p-1 text-white'><p>Login</p></button>
            </form>
        </div>
    </div>
  )
}

export default Login