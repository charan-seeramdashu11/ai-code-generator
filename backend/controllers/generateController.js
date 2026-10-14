const fetch = require('node-fetch');
const Generation = require('../models/Generation');

// POST /api/generate
const generateCode = async (req, res) => {
  try {
    const { prompt, language } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        message: 'OPENAI_API_KEY is not set on the server. Add it to backend/.env'
      });
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const targetLanguage = language || 'javascript';

    const systemPrompt =
      `You are an expert software engineer. Generate clean, correct, well-commented ` +
      `${targetLanguage} code for the user's request. Respond with ONLY the code, ` +
      `no explanations, no markdown fences.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI API error:', errText);
      return res.status(502).json({ message: 'AI provider request failed', detail: errText });
    }

    const data = await response.json();
    const generatedCode = data.choices?.[0]?.message?.content?.trim() || '';

    const saved = await Generation.create({
      prompt,
      language: targetLanguage,
      generatedCode
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error('generateCode error:', err);
    res.status(500).json({ message: 'Server error while generating code' });
  }
};

// GET /api/generate/history
const getHistory = async (req, res) => {
  try {
    const history = await Generation.find().sort({ createdAt: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    console.error('getHistory error:', err);
    res.status(500).json({ message: 'Server error while fetching history' });
  }
};

// DELETE /api/generate/:id
const deleteGeneration = async (req, res) => {
  try {
    await Generation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('deleteGeneration error:', err);
    res.status(500).json({ message: 'Server error while deleting entry' });
  }
};

module.exports = { generateCode, getHistory, deleteGeneration };
