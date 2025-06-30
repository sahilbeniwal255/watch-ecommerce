import productModel from '../models/productModel.js'

// function to add product

const addProduct = async (req, res) => {
    try {
        
        const {name, description,image, price, category, sub_category, strapMaterial, strapColor, bestseller} = req.body;
        const productData = {
            name,
            description,
            image,
            price : Number(price),
            category,
            sub_category,
            strapMaterial,
            strapColor,
            bestseller : Boolean(bestseller)
        }
        console.log(productData);
        const product = new productModel(productData);
        await product.save();
        res.json({success: true, msg : 'product added'})

    } catch (error) {
        console.log(error);
        res.json({success : false, error : error})
    }
}
const listProduct = async (req, res) => {
    try {
        const products = await  productModel.find({});
        res.json({sucess:true, products});

    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
    
}

const removeProduct = async (req, res) => {
    try {
        const {id} = req.body;
        await productModel.findByIdAndDelete(id);
        res.json({success : true, msg : 'product deleted'});
    } catch (error) {
        res.json({success:false});
        console.log(error);
    }
}

const singleProduct = async (req, res) => {
    try {
        
        const {id} = req.body;
        const product = await productModel.findById(id);
        res.json({success : true, product});

    } catch (error) {
        
        res.json({success:false});
        console.log(error);
        
    }
}


export {addProduct, listProduct, removeProduct, singleProduct}