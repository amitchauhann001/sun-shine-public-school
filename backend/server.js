import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import authRoutes from './routes/authRoutes.js';
import carouselRoutes from './routes/carouselRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use('/api/users', authRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('School Portal API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
