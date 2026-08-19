const express = require('express');
const router = express.Router();
const { extractTasksFromTranscript } = require('../services/gemini');

router.post('/', async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript || !transcript.trim()) {
      return res.status(400).json({ error: 'Transcript is required' });
    }
    const result = await extractTasksFromTranscript(transcript);
    res.json(result);
  } catch (error) {
    console.error('Extraction error:', error);
    res.status(500).json({ error: 'Failed to extract tasks' });
  }
});

module.exports = router;