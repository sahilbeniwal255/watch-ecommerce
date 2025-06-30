import React from 'react'
import {useState, useContext, useEffect} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import {useNavigate} from 'react-router-dom'

const Cart = () => {

  const {products, cartItems, updateQuantity} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const cart = async () => {
    const data = [];
    for (let [key, value] of Object.entries(cartItems)){
      if(value > 0){
        data.push({cpid : key, quantity: value})
      }
      setCartData(data);
    }
  }

  useEffect(() => {
    cart();
  }, [cartItems]);

  

  return (
    <div className='flex flex-col items-center justify-center'>
      <Title text1 = 'YOUR ' text2 = 'CART'/>
      <div className='grid grid-cols-1 gap-3 w-fit'>
        {cartData.length === 0 ? <p>NO ITEMS</p> : (cartData.map((element, index) => {
          const product = products.find((item, _) => element.cpid === item._id);
          return product ?  (
          <div key = {index} className='flex flex-col sm:h-40 border-2 border-black sm:flex-row'>                  
            <img className='w-60' src = {product.image}/>
            <div className='flex flex-col p-5 pr-10 text-sm bg-black text-white w-full gap-2'>
              <p>{product.name}</p>
              <p>Price : ${product.price}</p>
              <div className='flex gap-3'>
                <p>Quantity : </p>
                <input onChange = {(e) => {updateQuantity(element.cpid, Number(e.target.value))}} className='w-7 bg-black' type = 'number' min = {1} defaultValue={element.quantity}/>
              </div>
              <button onClick = {() => {updateQuantity(element.cpid, 0)}} className='border-2 border-white rounded-full hover:bg-white hover:text-black'><p>Remove</p></button>
              
            </div>
          </div>) : null;
        }))}
      </div>
      <div>
        <CartTotal/>
        <button onClick={() => navigate('/placeorder')} className='border-2 rounded-full text-white bg-black p-1 mt-2 text-center w-full'><p>Buy Now</p></button>
      </div>
    </div>
  )
}

export default Cart