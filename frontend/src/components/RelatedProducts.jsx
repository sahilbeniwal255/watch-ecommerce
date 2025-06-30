import React, { useContext, useState, useEffect } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext'

const RelatedProducts = (props) => {
    const {products} = useContext(ShopContext);
    const {strapMaterial, strapColor, category, pId} = props;
    const [related, setRelated] = useState([]);
    useEffect(() => {
      setRelated(products.filter((element, _) => (pId !== element._id && category === element.category && strapColor === element.strapColor && strapMaterial === element.strapMaterial)));
    },[products])

  return (
    <div className='flex flex-col gap-3'>
        <Title text1 = 'RELATED ' text2 = 'PRODUCTS'/>
        <div className = {`grid grid-cols-${Math.min(2, related.length)} sm:grid-cols-${Math.min(3, related.length)} md:grid-cols-${Math.min(4, related.length)} lg:grid-cols-${Math.min(5, related.length)} gap-3 ml-3 mr-3 mb-5`}>
            {related.length === 0 ? 'No related products' :related.map((element, index) => (<ProductItem key = {index} id = {element._id} image = {element.image} name = {element.name} price = {element.price}/>))}
        </div>
    </div>
  )
}

export default RelatedProducts