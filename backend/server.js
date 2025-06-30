import express from 'express'
import connectDB from './mongodb.js'
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;


//to allow frontend to make requests to backend
//here * means from all origins access granted


const corsOptions = {
  origin: ['http://localhost:5174', 'http://localhost:5173'], // Your frontend origin
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
// Optional: handle preflight manually only if needed
// app.options('*', cors(corsOptions));

//middleware

app.use(express.json())

//use app from any ip

connectDB();

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => (res.status(200).send('hi')))


app.listen(PORT, () => {console.log('app is listing at port ', PORT)})