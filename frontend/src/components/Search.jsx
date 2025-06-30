import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const Search = () => {
  
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
      if(!location.pathname.includes('collection')){
        setShowSearch(false);
      }
    }, [location])
    
    return (
        <>
            {showSearch && (<div className='flex items-center justify-center p-3 mb-3 gap-0'>
                <input onChange = {(e) => {setSearch(e.target.value)}} value = {search} type = 'text' className = 'p-2 border-2 border-black h-[30px] mr-[-3px]'/>
                <button onClick={() => {setSearch('')}} className='bg-black text-white pl-2 pr-2 h-[30px] text-center'><p>Clear</p></button>
            </div>)}
        </>
    )
}

export default Search