const express = require('express');
const dotenv  = require('dotenv');
const cors    = require('cors');
const morgan  = require('morgan');
const connectDB = require('./config/db');

// Load env vars FIRST
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ─── Middleware ──────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// ─── Routes ──────────────────────────────────────
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/grocery', require('./routes/groceryRoutes'));

// ─── Health check ────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running', status: 'OK' });
});

// ─── Error Middleware ─────────────────────────────
app.use(require('./middleware/errorMiddleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));