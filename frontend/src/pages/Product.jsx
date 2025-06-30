import React, { useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {products, addToCart} = useContext(ShopContext);
  const {productId} = useParams();
  const [productData, setProductData] = useState(null);
  const [productImage, setProductImage] = useState(null);

  const data = async () => {
    const foundProduct = products.find(element => element._id === productId);
    if(foundProduct){
      setProductData(foundProduct);
      setProductImage(foundProduct.image);
    }
  }
  
  useEffect(() => {
    data();
  }, [productId, products]);


  return (
    productData ? (
    <div className='flex flex-col items-center'>
      <div className = 'lg:h-[390px] lg:w-[1000px] grid grid-rows-2 grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 gap-0 ml-5 mr-5'>
        {/*product image*/}
        <div>
          <img className='h-full w-full' src = {productImage}/>
        </div>
        {/*product info*/}
        <div className='flex flex-col gap-3 bg-black text-white p-4 h-full'>
          <p className='text-2xl'>{productData.name}</p>
          <p>{productData.description}</p>
          <p>Watch Type : {productData.category.charAt(0).toUpperCase() + productData.category.slice(1)}</p>
          <p>Strap Material : {productData.strapMaterial.charAt(0).toUpperCase() + productData.strapMaterial.slice(1)}</p>
          <p>Strap Colour : {productData.strapColor.charAt(0).toUpperCase() + productData.strapColor.slice(1)}</p>
          {productData.bestseller && <p className='bg-gray-500 w-fit pl-2 pr-2 rounded text-sm'>Bestseller</p>}
          {Number(productId) < 8 && <p className='bg-gray-500 w-fit pl-2 pr-2 rounded text-sm'>Latest</p>}
          <p>Price : $ {productData.price}</p>
        </div>
      </div>
      <div>
        <button onClick = {() => {addToCart(productId)}} className='bg-black text-white text-sm mt-5 pl-14 pr-14 p-2 rounded-full'><p>ADD TO CART</p></button>
      </div>
      <div className='mt-5'>
        <RelatedProducts className = 'max-w-[600px]' pId = {productId} category = {productData.category} strapMaterial = {productData.strapMaterial} strapColor = {productData.strapColor}/>
      </div>
    </div>) : <div className='flex w-full h-full items-start justify-center'><h1>NO PRODUCT</h1></div>
  )
}

export default Product