// TODO: Build the prompt using query + result.answer


//SyntaxError: The requested module './routes/chat.js' does not provide an export named 'default'


// TODO: Use openai.createCompletion() to generate response

import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Mock AI response' });
});

export default router; // ← this is critical
