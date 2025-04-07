// TODO: Extract query from request
// TODO: Search knowledgeBase for a match
// TODO: Return result or 404

/**
 * Route: POST /api/search
 * - Accepts a query string
 * - Searches knowledgeBase for a matching question
 * - Returns the matching item or a message if not found
 */
// routes/search.js

import express from 'express';
import knowledgeBase from '../data/knowledgeBase.js';

const router = express.Router();

router.post('/', (req, res) => {
  const query = req.body.query?.toLowerCase();

  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }

  const result = knowledgeBase.find(item =>
    item.question.toLowerCase().includes(query)
  );

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "No matching result found." });
  }
});

export default router; 
