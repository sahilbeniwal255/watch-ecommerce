import React from 'react'
import {useContext, useState, useEffect} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latest, setLatest] = useState([]);
    const [bestseller, setBestseller] = useState([]);

    useEffect(() => {
      setLatest(products.slice(0, 5));
      setBestseller(products.filter((element, index) => (element.bestseller === true)));
    }, [products])
    
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <Title text1 = 'LATEST' text2 = 'COLLECTIONS'/>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ml-3 mr-3 mb-5'>
                {latest.map((element, index) => (<ProductItem key = {index} id = {element._id} image = {element.image} name = {element.name} price = {element.price}/>))}
            </div>
            <Title text1 = 'OUR' text2 = 'BESTSELLERS'/>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ml-3 mr-3 mb-5'>
                {bestseller.map((element, index) => (<ProductItem key = {index} id = {element._id} image = {element.image} name = {element.name} price = {element.price}/>))}
            </div>
        </div>
    )
}

export default LatestCollection