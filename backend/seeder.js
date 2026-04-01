import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany(); // Clear existing users

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@school.com',
      password: 'password123', // Will be hashed by pre-save middleware
      isAdmin: true,
    });

    await adminUser.save();

    console.log('Admin User Imported (admin@school.com / password123)');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Carousel.deleteMany();
    await Announcement.deleteMany();
    await Achievement.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
