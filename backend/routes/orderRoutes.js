
import express from 'express'
import { Router } from 'express'
import {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus} from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'

const orderRouter = express.Router();

orderRouter.post('/placeOrder', authUser, placeOrder);

orderRouter.post('razorpay', authUser, placeOrderRazorpay);

orderRouter.post('/stripe',authUser ,placeOrderStripe);

orderRouter.post('/list', adminAuth, allOrders);

orderRouter.post('/userOrders', authUser, userOrders);

orderRouter.post('/update', adminAuth, updateStatus);

export default orderRouter;