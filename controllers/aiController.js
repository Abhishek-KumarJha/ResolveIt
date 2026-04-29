const { GoogleGenAI } = require('@google/genai');

const suggestResolution = async (req, res, next) => {
    try {
        const { description, category } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: 'Gemini API key is missing' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are a senior IT support agent. A user has submitted the following support ticket (Category: ${category}):\n"${description}"\n\nPlease provide a short, professional, and actionable suggested resolution or troubleshooting steps for this issue. Keep it concise (under 150 words) and format it nicely.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.status(200).json({ suggestion: response.text });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    suggestResolution
};
