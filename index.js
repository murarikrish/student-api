const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

//quotes
const quotes = [
  "Arise, awake, and stop not till the goal is reached. — Swami Vivekananda",
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

// Rate Limiting: 5 requests per minute per IP
const quoteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - new Date()) / 1000);
    return {
      error:` Rate limit exceeded. Try again in ${retryAfter} seconds.`
    };
  }
});

// Endpoint: GET /api/quote
app.get('/api/quote', quoteLimiter, (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/quote`);
});