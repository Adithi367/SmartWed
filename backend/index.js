import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import mongoConnection from './db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import planRoutes from './routes/planRoutes.js';
import authRoutes from './routes/authRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import quotationRoutes from './routes/quotationRoutes.js'
const app=express();
const PORT=process.env.PORT
app.use(express.json())
mongoConnection();
app.use(cors({
    origin:['http://localhost:5173']
}));
app.get('/',(req,res)=>{
    console.log('API is working')
    res.send('API is working')
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
app.use('/users',userRoutes)
app.use('/auth',authRoutes)
app.use('/plan',planRoutes)
app.use('/vendor',vendorRoutes)
app.use('/booking',bookingRoutes)
app.use('/admin',adminRoutes)
app.use('/quotation',quotationRoutes)