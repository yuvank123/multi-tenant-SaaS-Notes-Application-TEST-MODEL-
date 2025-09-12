import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';

// Initialize app
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);
app.use('/tenants', tenantRoutes);

// Start server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
);