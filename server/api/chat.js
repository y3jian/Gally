import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).send("Gemini chat API is live. POST { question }.");
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { question } = body;
    if (!question) return res.status(400).json({ error: "Missing 'question' in body" });

    const key = process.env.GOOGLE_API_KEY;
    if (!key) return res.status(500).json({ error: "GOOGLE_API_KEY missing" });

    // Force v1 (stops it from hitting v1beta)
    const genAI = new GoogleGenerativeAI(key, { apiVersion: "v1" });
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
    const resp  = await model.generateContent(question);

    return res.status(200).json({ answer: resp.response.text() });
  } catch (e) {
    console.error("Gemini handler error:", e);
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
