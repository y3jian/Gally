import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

    const { question } = req.body || {};
    if (!question) return res.status(400).json({ error: "Missing question" });

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const rsp = await model.generateContent(question);
    res.status(200).json({ answer: rsp.response.text() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Chat failed" });
  }
}
