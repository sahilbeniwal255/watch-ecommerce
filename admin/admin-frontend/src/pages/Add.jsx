import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { FaCheckCircle } from "react-icons/fa";

const Add = (props) => {

  const {token} = props;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [strapMaterial, setStrapMaterial] = useState('');
  const [strapColor, setStrapColor] = useState('');
  const [bestseller, setBestseller] = useState(false);

  const [cong, setCong] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("sub_category", sub_category);
      formData.append("strapColor", strapColor);
      formData.append("strapMaterial", strapMaterial);
      formData.append("bestseller", bestseller);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers : {token}});
      if(!response.data.success) alert(response.data);
      else{
        setCong(true);
        setName('');
        setImage('');
        setPrice('');
        setDescription('');
        setCategory('');
        setSubCategory('')
        setStrapColor('');
        setStrapMaterial('');
        setBestseller(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setCong(false);
    }, 3000);
  }, [cong])
  

  return (
    <>
      {cong ? (
      <div className='flex flex-col w-full h-screen items-center justify-center'>
        <FaCheckCircle className='w-1/4 h-1/4' />
        <p className='text-2xl'>Product Added Successfully</p>
      </div>) : 
      (<div className='mt-4 flex flex-col w-full h-screen items-center'>
        <h1 className='text-2xl'>Add Product Details</h1>
        <form onSubmit={onSubmitHandler} className='ml-2 mt-6 mr-2 border-2 p-3 border-black pr-4 w-fit h-fit flex flex-col gap-3'>
          <div className='flex flex-col sm:flex-row gap-5 justify-between'>
            <p>Product Name </p><input onChange={(e) => setName(e.target.value)} value = {name} required className='pl-2 border border-black'/>
          </div>
          <div className='flex gap-2 flex-col sm:flex-row justify-between'>
            <p>Image url </p>
            <div className='flex'>
              <input onChange={(e) => setImage(e.target.value)} value = {image} required className='pl-2 border border-black'/>
              <button className='text-white p-1 bg-black' onClick={() => setImage('')}><p>Clear</p></button>
            </div>
          </div>
          {image ? <img className='w-1/2' src = {image} alt = 'broken link'/> : <p>No image uploaded</p>}
          <div className='flex gap-2 flex-col sm:flex-row justify-between'>
            <p>Description </p><textarea onChange={(e) => setDescription(e.target.value)} value = {description} required className='pl-2 border border-black'/>
          </div>
          <div className='flex flex-col sm:flex-row gap-5 justify-between'>
            <p>Price </p><input onChange={(e) => setPrice(e.target.value)} value = {price} required className='pl-2 border border-black'/>
          </div>

          <div className='flex flex-col gap-4 w-full'>
            <div className='flex gap-10 justify-between'>
              <p>Category </p><select  onChange={(e) => setCategory(e.target.value)} value = {category} className='bg-black text-white font-serif p-1 pl-2 pr-2'>
              <option value="" hidden>Select Category</option>
              <option value = 'analog'>Analog</option>
              <option value = 'digital'>Digital</option>
              </select>
            </div>
            
            <div  className='flex gap-2 justify-between'>
              <p>Sub Category </p><select onChange={(e) => setSubCategory(e.target.value)} value = {sub_category} className='bg-black text-white font-serif p-1 pl-2 pr-2'>
              <option value="" hidden>Select Category</option>
              <option value = 'luxury'>Luxury</option>
              <option value = 'sports'>Sports</option>
              </select>
            </div>
            
            <div className='flex gap-2 justify-between'>
              <p>Strap Material </p><select onChange={(e) => setStrapMaterial(e.target.value)} value = {strapMaterial} className='bg-black text-white font-serifp p-1 pl-2 pr-2'>
              <option value="" hidden>Select Category</option>
              <option value = 'rubber'>Rubber</option>
              <option value = 'leather'>Leather</option>
              </select>
            </div>
            
            <div className='flex gap-2 justify-between'>
              <p>Strap Colour </p><select  onChange={(e) => setStrapColor(e.target.value)} value = {strapColor} className='bg-black text-white font-serif p-1 pl-2 pr-2'>
              <option value="" hidden>Select Category</option>
              <option value = 'white'>White</option>
              <option value = 'black'>Black</option>
              </select>
            </div>
            <div className='flex gap-2'>
              <input onChange={() => setBestseller(!bestseller)} type='checkbox' id = 'bestseller'/><label htmlFor='bestseller' className='cursor-pointer'><p>Bestseller </p></label>
            </div>
          </div>
          <button type = 'submit' className='pl-10 pr-10 p-1 bg-black text-white'><p>Add Product</p></button>
        </form>
      </div>)}
    </>
  )
}

export default Add