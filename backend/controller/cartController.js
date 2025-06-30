import userModel from '../models/userModel.js'


const addToCart = async (req, res) => {
    try {
        {/*we will recieve these from frontend in request body*/}
        const {userId, productId} = req.body;
        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;
        if(cartData[productId]){
            
            cartData[productId] += 1;
        }
        else{
            cartData[productId] = 1;
        }
        console.log(cartData);
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success : true, messge : 'product added to cart'});
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error});
    }
}

const updateCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        const userData = await userModel.findById(userId);
        console.log(userData.cartData);
        await userModel.findByIdAndUpdate(userId, {$set: { [`cartData.${productId}`]: quantity }});
        
        res.json({success : true, messge : 'cart updated'});
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error});
    }
}

const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;
        res.json({success : true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error});
    }
}

export {addToCart, getUserCart, updateCart}