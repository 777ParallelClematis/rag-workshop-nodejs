/**
 * Main server file for AI RAG Workshop
 * - Sets up the Express server
 * - Serves static frontend
 * - Mounts API routes: /api/chat and /api/search
 */

import express from 'express';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv'; // ✅ DON'T COMMENT THIS OUT

import chatRoute from './routes/chat.js';
import searchRoute from './routes/search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON and static files
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// API routes
app.use('/api/chat', chatRoute);
app.use('/api/search', searchRoute);

// Simple test route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the AI RAG API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
