import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react'
import {backendUrl} from '../App.jsx'

const Orders = (props) => {

  const {token} = props;

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/orders/list', {}, {headers : {token}});
      console.log(response)
      if(response.data.success){
        console.log(response.data);
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/orders/update', {orderId, status : e.target.value}, {headers : {token}});
      console.log(response)
      if(response.data.success){
        alert(response.data.message);
      }else{
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrders();
  }, [])

  return (
    <div className='m-3 w-full'>
      <div className=''>
        {orders.map((order, index) => {
          return(
          <div className='border-2 mb-3' key = {index}>
            {order.products.map((product, i) => {
              return(
              <div className='grid grid-cols-1 sm:grid-cols-3 place-items-center m-2 p-2 place-content-between' key = {i}>
                <div>
                  <img className='h-40 w-40' src = {product.image}/>
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                </div>
                <div className='p-2'>
                  <p><b>Name : </b>{order.address.firstName} {order.address.lastName}</p>
                  <p><b>Phone no. : </b>{order.address.phone}</p>
                  <p className='text-wrap'><b>Address : </b>{order.address.address}</p>
                  <p><b>City : </b>{order.address.city}</p>
                  <p><b>State : </b> {order.address.state}</p>
                </div>
              </div>)
            })}
            <select className='m-3 border-2 p-1' value = {order.status} onChange={(e) => statusHandler(e, order._id)}>
              <option value = 'orderplaced'>Order Placed</option>
              <option value = 'packed'>Packed</option>
              <option value = 'shipped'>Shipped</option>
              <option value = 'outfordelivery'>Out for Delivery</option>
              <option value = 'delivered'>Delivered</option>
            </select>
          </div>)
        })}
      </div>
    </div>
  )
}

export default Orders