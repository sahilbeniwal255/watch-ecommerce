import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App';
import axios from 'axios'
import { MdDelete } from "react-icons/md";

const List = (props) => {

  const {token} = props;

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      setList(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  const remove = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers : {token}});
      console.log(response.data);
      alert('product deleted successfully')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, [remove])
  

  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <h1 className='text-2xl mt-3'>All Items In Database</h1>
      <div className='border-2 border-black ml-3 mr-3 mt-3'>
        <div className='grid grid-cols-4 place-items-center border-b-2 border-black p-3 '><p>Image</p><p>Name</p><p>price</p><p>Delete</p></div>
        {list.length === 0 ? (<p>No items in database</p>): (
          list.map((el, index) => (
          <div className='grid grid-cols-4 place-items-center gap-3' key = {index}>
            <img className='h-3/4' src = {el.image}/>
            <p>{el.name}</p>
            <p>${el.price}</p>
            <MdDelete onClick = {() => remove(el._id)} className='w-6 h-6'/>
          </div>
        )))}
      </div>
    </div>
  )
}

export default List