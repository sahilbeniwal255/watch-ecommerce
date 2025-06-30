import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
  const {totalCartAmount, delivery_fee} = useContext(ShopContext);

  return (
    <div>
        <Title text1 = 'Cart' text2 = 'TOTAL'/>
        <div className='p-4 flex flex-col justify-center items-center gap-2'>
            <p>Cart Total Amount : ${totalCartAmount()}</p>
            <p>Delivey charge : ${delivery_fee}</p>
            <p>Total checkout Amount : ${Number(totalCartAmount()) + Number(delivery_fee)}</p>
        </div>
    </div>
  )
}

export default CartTotal