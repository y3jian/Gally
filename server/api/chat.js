import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // --- CORS for Expo Web and mobile ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type, x-app-key");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end(); // preflight
  if (req.method === "GET") return res.status(200).send("Gemini chat API is live. POST { question }.");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    // Defensive JSON parsing (Vercel usually parses, but be safe)
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { question } = body;
    if (!question) return res.status(400).json({ error: "Missing 'question' in body" });

    const key = process.env.GOOGLE_API_KEY;
    if (!key) return res.status(500).json({ error: "GOOGLE_API_KEY missing in Vercel env" });

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const SYSTEM = `You are a friendly menstrual health assistant.
General info only; do not diagnose. Be concise & empathetic.`;
    const prompt = `${SYSTEM}\n\nUser: ${question}\nAssistant:`;

    const rsp = await model.generateContent(prompt);
    return res.status(200).json({ answer: rsp.response.text() });
  } catch (e) {
    console.error("Gemini handler error:", e);
    return res.status(500).json({ error: "Chat failed" });
  }
}
