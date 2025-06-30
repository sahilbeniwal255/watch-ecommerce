import React, { useContext } from 'react'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import './Navbar.css'
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import{Link} from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [vis, setVis] = useState(false);
    const {showSearch, setShowSearch, cartSize, token, setToken} = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    const search = () => {
        if(location !== '/collection'){
            navigate('/collection');
        }
        setShowSearch(!showSearch);

    }

    const logOut = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
    }

  return (
    <div className='flex items-center justify-between p-5'>
        {/* logo of website*/}
        <h1><Link to = 'http://localhost:5173'>HERMAN'</Link></h1>

        {/* ul is hidden when screen size is small*/}
        <ul className = 'hidden sm:flex gap-5 text-sm'>
            <NavLink to = '/' className = 'flex flex-col item-center gap-1'>
                <p>HOME</p><hr className='h-[1.5px] bg-black'></hr>
            </NavLink>
            <NavLink to = '/collection' className = 'flex flex-col item-center gap-1'>
                <p>COLLECTION</p><hr className='h-[1.5px] bg-black'></hr>
            </NavLink>
            <NavLink to = '/about' className = 'flex flex-col item-center gap-1'>
                <p>ABOUT</p><hr className='h-[1.5px] bg-black'></hr>
            </NavLink>
            <NavLink to = '/contact' className = 'flex flex-col item-center gap-1'>
                <p>CONTACT</p><hr className='h-[1.5px] bg-black'></hr>
            </NavLink>
        </ul>
        <div className = 'flex gap-3 cursor-pointer'>
            <CiSearch id = 'search' onClick = {search}/>
            <Link to = '/cart'>
                <IoCartOutline id = 'cart' />
                <p id = 'cnt' className='p-0 margin-0 h-4 w-4 relative rounded-full bg-black border text-white text-[10px] text-center'>{cartSize}</p>
            </Link>
            {/*group-hover is a utility class which definess properties when parent element is hovered but parent element should have group class*/}
            <div className = 'group'>
               <RiAccountCircleLine onClick={() => {token ? null : navigate('/login')}} id = 'profile'/> 
                {token && (<div className='group-hover:block hidden absolute right-2 dropdown-menu'>
                    <div className = 'text-slate-500 flex flex-col gap-2 bg-slate-100 p-2 rounded'>
                        <p className='cursor-pointer hover:text-black'>my profile</p>
                        <p className='cursor-pointer hover:text-black' onClick={() => navigate('/orders')}>orders</p>
                        <p onClick={logOut} className='cursor-pointer hover:text-black'>logout</p>
                    </div>
                </div>)}
            </div>
            <IoIosMenu onClick={()=>{setVis(true)}} id = 'menu' className='block sm:hidden' />
        </div>
        {/*creating a dropdown menu using state and ternary operator*/}
        <div className = {`absolute left-0 top-0 w-full h-full bg-white ${vis ? 'flex' : 'hidden'}`}>
            <IoIosArrowBack onClick = {()=>{setVis(false)}} id = 'close'/>
            <div id = 'drop'>
                <Link to = '/' onClick = {()=>{setVis(false)}}>HOME</Link>
                <Link to = '/collection' onClick = {()=>{setVis(false)}}>COLLECTION</Link>
                <Link to = '/about' onClick = {()=>{setVis(false)}}>ABOUT</Link>
                <Link to = '/contact' onClick = {()=>{setVis(false)}}>CONTACT</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar