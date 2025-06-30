import React, { useState, useContext, useEffect } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import Title from '../components/Title' 
import {ShopContext} from '../context/ShopContext'
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [strapMaterial, setStrapMaterial] = useState([]);
  const [strapColor, setStrapColor] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const changeCategory = (e) => {
    if(category.includes(e.target.value)) setCategory(pre => pre.filter((element, _) => (element != e.target.value)));
    else setCategory([...category, e.target.value]);
  }

  const changeStrapMaterial = (e) => {
    if(strapMaterial.includes(e.target.value)) setStrapMaterial(pre => pre.filter((element, _) => (element != e.target.value)));
    else setStrapMaterial([...strapMaterial, e.target.value]);
  }

  const changeStrapColor = (e) => {
    if(strapColor.includes(e.target.value)) setStrapColor(pre => pre.filter((element, _) => (element != e.target.value)));
    else setStrapColor([...strapColor, e.target.value]);
  }

  const applyFilter = () => {
    let p = products.slice();
    if(showSearch && search){
      p = p.filter((element, _) => (element.name.toLowerCase().includes(search.toLowerCase())))
    }
    if(category.length > 0){
      p = p.filter((element, _) => (category.includes(element.category)));
    }
    if(strapMaterial.length > 0){
      p = p.filter((element, _) => (strapMaterial.includes(element.strapMaterial)));
    }
    if(strapColor.length > 0){
      p = p.filter((element, _) => (strapColor.includes(element.strapColor)));
    }
    setFilterProducts(p);
  }

  const sort = () => {
    let p = filterProducts.slice();
    if(sortType === 'l-h'){
      setFilterProducts(p.sort((a, b) => (a.price - b.price)))
    }else if(sortType === 'h-l'){
      setFilterProducts(p.sort((a, b) => (b.price - a.price)))
    }else{
      {/*initially filtered product state is empty ans if any option from fillter doesnot chmage then it will stay empy so we call it here*/}
      applyFilter();
    }
  }

  useEffect(() => {
    applyFilter();
  }, [products, category, strapColor, strapMaterial, search, showSearch])

  useEffect(() => {
    sort();
  }, [sortType])
  

  return (
    <div className='flex flex-col sm:flex-row'>
      {/*filters*/}
      <div className='flex flex-col gap-5 ml-6 mr-6 mt-[75px]'>
        <p className='flex w-fit gap-2' onClick={() => {setShowFilter(!showFilter)}}>FILTERS<IoIosArrowForward className = {`relative sm:hidden h-6 transition ${showFilter ? 'rotate-90' : ''}`}/></p>
        <div className={`border-2 bg-black text-white w-full border-black ${showFilter ? '' : 'hidden'} sm:flex sm:flex-col sm:gap-2 sm:w-fit sm:h-full`}>
          <div className = {'flex flex-col w-fit p-4 gap-3'}>
            <p>CATEGORIES</p>
            <div className='flex flex-col'>
              <div className='flex gap-2'><input type = 'checkbox' value = 'analog' onClick = {changeCategory}/><p>Analog watches</p></div>
              <div className='flex gap-2'><input type = 'checkbox' value = 'digital' onClick = {changeCategory}/><p>Digital watches</p></div>
            </div>
          </div>

          <div className='flex flex-col w-fit p-4 gap-3'>
            <p>SUB CATEGORIES</p>
            <div className='flex flex-col pl-3'>
              <div>
                <p>Strap material</p>
                <div className='flex gap-2 pl-3'><input type = 'checkbox' value = 'rubber' onClick = {changeStrapMaterial}/><p>Rubber</p></div>
                <div className='flex gap-2 pl-3'><input type = 'checkbox' value = 'leather' onClick = {changeStrapMaterial}/><p>Leather</p></div>
              </div>
              <div>
                <p>Strap colour</p>
                <div className='flex gap-2 pl-3'><input type = 'checkbox' value = 'black' onClick = {changeStrapColor}/><p>Black</p></div>
                <div className='flex gap-2 pl-3'><input type = 'checkbox' value = 'white' onClick = {changeStrapColor}/><p>White</p></div>              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <Title text1 = 'OUR ' text2 = 'COLLECTIONS'/>
          <p className='ml-3'>Sort by:
            <select onChange={(e) => {setSortType(e.target.value)}} className='p-2 ml-1'>
              <option className='p-2' value = 'relevant'>Relevent</option>
              <option className='p-2' value = 'l-h'>Price Low to High</option>
              <option className='p-2' value = 'h-l'>Price High to Low</option>
          </select>
          </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ml-3 mr-3 mt-5'>
          {filterProducts.map((element, index) => (
            <ProductItem key = {index} id = {element._id} image = {element.image} name = {element.name} price = {element.price}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection