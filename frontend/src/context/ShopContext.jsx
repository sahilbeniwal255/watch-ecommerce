import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

{/*here context is created so that we can use products in any component without drilling
    here first context is created and exported
    then context provider iss created which return
    <provider><app/></provider> because it is set as child in main.jsx file
    and app contain all components so it can now be accessed everywhere*/}

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const navigate = useNavigate();
        

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("herman_cart");
    return storedCart ? JSON.parse(storedCart) : {};
    });

    const [cartSize, setCartSize] = useState(0);
    const delivery_fee = 10;

    const [products, setProducts] = useState([]);

    const [token, setToken] = useState('');

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list');
            
            if(response.data.sucess){
                setProducts(response.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getProductsData();
    },[])

    useEffect(() => {
      if(token) {
        getUserCart();
      }
    }, [token])
    

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
        setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const getUserCart = async () => {
        if(token){
            try {
                const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers : {token}});
                console.log(response.data.cartData);
                setCartItems(response.data.cartData);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const addToCart = async (productId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[productId]){
            cartData[productId]++;
        }
        else{
            cartData[productId] = 1;
        }
        setCartItems(cartData);
        //this means we are logged in so we can add them to database now
        if(token){
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', {productId} ,{headers : {token}});
                if(response.data.success) alert('product added to cart')
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const updateQuantity = async (productId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[productId] = quantity;
        setCartItems(cartData);
        if(token){
            try {
                const response = await axios.post(backendUrl + '/api/cart/update', {productId, quantity} ,{headers : {token}})
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const totalCartAmount = () => {
        let t = 0;
        for (let [key, value] of Object.entries(cartItems)){
            const p = products.find((element) => element._id === key);
            if(p) t += Number(p.price) * Number(value);
        }
        return t;
    }

    useEffect(() => {
        const newCartSize = Object.values(cartItems).filter(value => value > 0).length;
        setCartSize(newCartSize);
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    
    
    const value = {
        products,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        cartSize,
        totalCartAmount,
        setToken,
        token,
        backendUrl,
        navigate
    }
    return(
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;