import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'

const ProductItem = (props) => {
  const {id, image, name, price} = props;

  return (
    <Link to = {`/product/${id}`}>
      <div className='overflow-hidden flex items-center justify-center'>
        <img src = {image} className = 'hover:scale-110 transition ease-in-out w-60 h-40'/>
      </div>
      <p className='text-[14px] pt-2'>
        {name}
      </p>
      <p>${price}</p>
    </Link>
  )
}

export default ProductItem