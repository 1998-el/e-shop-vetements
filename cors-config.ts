// CORS configuration for the backend
import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:3000',  // Frontend development server
    'http://localhost:5173',  // Vite development server
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    // Add production URLs when deploying
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control'
  ],
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  optionsSuccessStatus: 200
};

// Simplified CORS configuration for static files (images)
const staticCorsOptions = {
  origin: true, // Allow all origins for static files
  credentials: true,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  optionsSuccessStatus: 200
};

export { corsOptions, staticCorsOptions };
export default cors(corsOptions);