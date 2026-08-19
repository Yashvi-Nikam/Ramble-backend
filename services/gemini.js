const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractTasksFromTranscript(transcript) {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  const prompt = `
You are a task-extraction assistant for a voice journaling app called Ramble.
Given a rambling voice transcript, identify distinct items and classify each as:
- "task" (something to do, no specific time)
- "reminder" (something to do at a specific time)
- "event" (a planned occurrence, usually with a date)

Return ONLY valid JSON, no other text, in this exact format:
{
  "items": [
    {
      "type": "task" | "reminder" | "event",
      "title": "short clean description",
      "time": "HH:MM in 24hr format, or null if not mentioned",
      "date": "description of date if mentioned, or null",
      "category": "Work" | "Personal" | "Study" | "Other",
      "confidence": "high" | "low"
    }
  ]
}

Use "low" confidence only when the transcript is genuinely ambiguous about whether something is actionable.

Transcript: "${transcript}"
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

module.exports = { extractTasksFromTranscript };