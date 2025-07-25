const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

const PORT = process.env.PORT || 3000;

// Quotes array (unchanged)
const quotes = [ "Arise, awake, and stop not till the goal is reached. — Swami Vivekananda",
  "You may never know what results come of your actions, but if you do nothing, there will be no result. — Mahatma Gandhi",
"Dream, dream, dream. Dreams transform into thoughts and thoughts result in action. — Dr. A.P.J. Abdul Kalam",
"It is very easy to defeat someone, but it is very hard to win someone. — Dr. A.P.J. Abdul Kalam",
"Take up one idea. Make that one idea your life—think of it, dream of it, live on that idea.— Swami Vivekananda",
"Freedom is not worth having if it does not include the freedom to make mistakes.— Mahatma Gandhi",
"Life is a difficult game. You can win it only by retaining your birthright to be a person.— Dr. A.P.J. Abdul Kalam",
"Don't be serious, be sincere.— Chetan Bhagat",
"The future belongs to those who believe in the beauty of their dreams.— Kalpana Chawla",
"The more we come out and do good to others, the more our hearts will be purified.— Swami Vivekananda",
"When you are inspired by some great purpose, all your thoughts break their bonds.— Patanjali",
"To succeed in your mission, you must have single-minded devotion to your goal.— Dr. A.P.J. Abdul Kalam"
 ]; 

// Rate limiter config
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => { // Changed from 'message' to 'handler'
    res.status(429).json({
      error: "Rate limit exceeded",
      retryAfter: "1 minute"
    });
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "Indian Wisdom Quotes API",
    endpoints: {
      quote: "/api/quote (GET)",
      rateLimit: "5 requests/minute"
    },
    totalQuotes: quotes.length
  });
});

app.get('/api/quote', limiter, (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({
    quote: quotes[randomIndex],
    remainingRequests: req.rateLimit.remaining,
    totalQuotes: quotes.length
  });
});

// Error handlers
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local endpoints:`);
  console.log(`http://localhost:${PORT}/`);
  console.log(`http://localhost:${PORT}/api/quote`);
});
