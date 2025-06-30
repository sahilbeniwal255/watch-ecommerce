import React, { useState, useContext } from 'react'
import CartTotal from '../components/CartTotal'
import { FaCcStripe } from "react-icons/fa";
import { FaStripe } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Placeorder = () => {

  const [method, setMethod] = useState('cod');

  const[formData, setFormData] = useState({
    firstName: '',
    lastName : '',
    address : '',
    city : '',
    state : '',
    phone  : ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data, [name] : value}));
  }

  const {products, navigate, backendUrl, token, cartItems, setCartItems, totalCartAmount, delivery_fee} = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for(const item in cartItems){
        if(cartItems[item] > 0){
          const itemInfo = structuredClone(products.find(product => product._id == item));
          if(itemInfo){
            console.log(itemInfo);
            itemInfo.quantity = item;
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        address : formData,
        products : orderItems,
        amount : Number(totalCartAmount()) + Number(delivery_fee)
      }

      if(method === 'cod'){
        const response = await axios.post(backendUrl + '/api/orders/placeOrder', orderData, {headers : {token}});
        if(response.data.success){
          setCartItems({});
          navigate('/orders');
        }else{
          alert(response.data.message);
        }
      }

      console.log(orderItems);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <form onSubmit={onSubmitHandler}>
        <div className='grid grid-cols-2 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 gap-2 w-fit p-4'>
          <p>Enter first name : </p><input required name = 'firstName' value = {formData.firstName} onChange = {onChangeHandler} className='border-2 border-black pl-3 p-1' type = 'text'/>
          <p>Enter last name : </p><input required name = 'lastName' value = {formData.lastName} onChange = {onChangeHandler} className='border-2 border-black pl-3 p-1' type = 'text'/>
          <p>Enter complete adress : </p><input required name = 'address' value = {formData.address} onChange = {onChangeHandler} className='border-2 border-black pl-3 p-1' type = 'text'/>
          <p>Enter city : </p><input required name = 'city' value = {formData.city} onChange = {onChangeHandler} className='border-2 border-black pl-3 p-1' type = 'text'/>
          <p>Enter state : </p><input required name = 'state' value = {formData.state} onChange = {onChangeHandler} className='border-2 border-black pl-3 p-1' type = 'text'/>
          <p>Enter Phone Number : </p><input required name = 'phone' value = {formData.phone} onChange = {onChangeHandler} className='border-2 border-black pl-3 p-1' type = 'text'/>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center w-fit m-5'>
            <CartTotal/>
            <div className='flex flex-wrap gap-6 h-fit mt-5 mb-5 m-5 w-fit justify-center items-center'>
              <div onClick={() => {setMethod('cod')}} className='flex gap-2 justify-center items-center'><p className={`p-2 h-4 w-4 rounded-full ${method === 'cod' ? 'bg-green-400' : 'bg-black'}`}></p><p className='text-center p-3'>Cash On Delivery</p></div>
            </div>
            <button type = 'submit' className='border-2 rounded-full text-white bg-black p-1 mt-2 text-center w-full'><p>Buy Now</p></button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Placeorder