import mongoose from 'mongoose';

const mongoConnection=async()=>{
    try {
        const mongoURL=process.env.MONGO_URL
        await mongoose.connect(mongoURL)
        console.log('Connected to MongoDB successfully')
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}
export default mongoConnection;