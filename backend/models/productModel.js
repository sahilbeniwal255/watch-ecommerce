import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    category : {type : String, required : true},
    sub_category : {type : String, required : true},
    image : {type : Array, required : true},
    bestseller : {type : Boolean},
    strapMaterial : {type : String, required : true},
    strapColor : {type : String, required : true}
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;