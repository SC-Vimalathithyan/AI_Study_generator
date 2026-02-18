const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const generateNotes = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `
    From the following text, return the response strictly in JSON format like this:

    {
      "summary": "short paragraph",
      "keyPoints": ["point1", "point2", "point3"],
      "quiz": [
        { "question": "question1", "answer": "answer1" },
        { "question": "question2", "answer": "answer2" }
      ]
    }

    Text:
    ${text}
    `;

    const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 800
  // response_format: { type: "json_object" }
  });

    let content = response.choices[0].message.content;

// Remove markdown wrapping if model adds it
    content = content.replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      console.log("Raw content:", content);
      return res.status(500).json({ error: "Invalid JSON from model" });
    }

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { generateNotes };