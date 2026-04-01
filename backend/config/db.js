import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️  MongoDB connection failed: ${error.message}`);
    console.warn('Server will continue running without database. DB-dependent routes will fail.');
  }
};

export default connectDB;
