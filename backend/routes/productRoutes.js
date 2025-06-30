import express from 'express'
import multer from 'multer'

import {addProduct, listProduct, removeProduct, singleProduct} from '../controller/productController.js'
import adminAuth from '../middleware/adminAuth.js';
const upload = multer();
////multer is required if we want to use form data and not json
const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.none(), addProduct);

productRouter.post('/remove', adminAuth, removeProduct);

productRouter.post('/single', singleProduct);

productRouter.get('/list', listProduct);

export default productRouter;