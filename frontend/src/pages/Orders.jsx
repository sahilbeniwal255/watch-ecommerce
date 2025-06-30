import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const Orders = () => {

  const {backendUrl, token} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const [isEmpty, setIsEmpty] = useState(false);

  const orders = async () => {
    try {
      if(!token){
        return null;
      }

      const response = await axios.post(backendUrl + '/api/orders/userOrders', {}, {headers: {token}});

      if(response.data.success){
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.products.map((product) => {
            //setting a new property to product
            product['status'] = order.status;
            product['paymentMethod'] = order.paymentMethod;
            product['date'] = order.date;
            allOrdersItem.push(product);
          })
        })
        if(allOrdersItem.length === 0) {
          setIsEmpty(true);
        }else{
          setIsEmpty(false);
        }
        setOrderData(allOrdersItem);
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token && backendUrl) orders();
    }, 500); // slight delay
    return () => clearTimeout(timer);
  }, [token, backendUrl]);

  return (
    <div className='w-full flex flex-col items-center'>
      
      <div className='grid grid-cols-3 p-2 w-full place-items-center mb-3 border-2 border-black bg-black text-white ml-2 mr-2'>
        <p>Product</p><p>Status</p><p>Payment Mode</p>
      </div>
      {isEmpty && <p className='items-center justify-center'>NO ORDERS TO SHOW</p>}
      {orderData.map((product, index) => {
        return (
          <div key = {index} className = 'grid w-full ml-2 mr-2 grid-cols-3 m-2 place-items-center border-2 p-2'>
            <div className='flex flex-col w-40 sm:flex-row items-center justify-center'>
              <img className='h-20 w-20' src = {product.image}/>
              <div className='m-1 ml-2'>
                <p className='text-sm'>{product.name}</p>
                <p className='text-sm text-slate-500'>{product.date}</p>
              </div>
            </div>
            <p>{product.status}</p>
            <p>{product.paymentMethod}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Orders