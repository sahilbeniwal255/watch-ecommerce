import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'

//for cod method
const placeOrder = async (req, res) => {
    try {
        const {userId, products, amount, address} = req.body;

        const orderData = {
            userId,
            products,
            address,
            amount,
            paymentMethod: 'cod',
            payment : false,///because cod
            date : new Date(Date.now()).toLocaleString('en-IN', {day: '2-digit',month: 'long',year: 'numeric'})
        }

        console.log(orderData);

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        //empty user cart after order placed
        await userModel.findByIdAndUpdate(userId, {cartData:{}});

        res.json({success : true, message : 'order placed'});

    } catch (error) {
        console.log(error);
    }
}


const placeOrderStripe = async (req, res) => {
    
}



const placeOrderRazorpay = async (req, res) => {
    
}

// for admin pannel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success : true, orders});
    } catch (error) {
        console.log(error);
        res.json({success : false, error});
    }
}

//for frontend
const userOrders = async (req, res) => {
    try {
        
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success : true, orders});

    } catch (error) {
        console.log(error);
        res.json({sucess : false, error});
    }
}

const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success : true, message : 'status updated'});
    } catch (error) {
        console.log(error);
        res.json({success : false, error});
    }
}

export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus}