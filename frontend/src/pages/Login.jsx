import React, { useContext, useState, useEffect } from 'react'
import {ShopContext} from '../context/ShopContext'
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const {token, setToken, backendUrl, cartItems} = useContext(ShopContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(login){
      const response = await axios.post(backendUrl + '/api/user/login', {email, password});
      if(!response.data.success){
        alert(response.data.message);
      }else{
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      }
      setName('');
      setEmail('');
      setPassword('');
    }else{
      const response = await axios.post(backendUrl + '/api/user/register', {name, email, password, cartItems});
      if(!response.data.success){
        alert(response.data.message);
      }else{
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      }
      setName('');
      setEmail('');
      setPassword('');
    }
  }
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && token) {
      navigate('/');
    }
  }, [loading, token]);
    

  return (
    <form onSubmit={onSubmitHandler} className='absolute flex -z-10 top-0 w-full h-screen justify-center items-center'>
      <div className='border-2 border-black p-5 flex flex-col items-center gap-4'>
        <h1>
          {login ? 'LOG IN' : 'SIGN UP'}
        </h1>
        <div className='flex flex-col gap-5 w-fit'>
          {!login && (
            <div className='flex gap-2 justify-between'><p>Name</p><input onChange = {(e) => setName(e.target.value)} value = {name} className='border-2 border-black pl-1'/></div>
          )}
          <div className='flex gap-2 justify-between'><p>Email</p><input onChange = {(e) => setEmail(e.target.value)} value = {email} className='border-2 border-black pl-1'/></div>
          <div className='flex gap-2 justify-between'><p>Password</p><input onChange = {(e) => setPassword(e.target.value)} value = {password} className='border-2 border-black pl-1' type = 'password'/></div>
          <button className='w-full mt-3 bg-black text-center text-white p-1 rounded-full'><p>{login ? 'LOG IN' : 'SIGN UP'}</p></button>
        </div>
        <p type = 'submit' className='cursor-pointer text-blue-600 underline' onClick={() => {setLogin(!login)}}>{login ? 'Create an account' : 'Already registered'}</p>
      </div>  
    </form>
  )
}

export default Login