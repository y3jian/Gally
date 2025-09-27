export const config = { maxDuration: 29 }; // Vercel max ~30s

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).send("Gemini 2.5 chat API is live. POST { question }.");
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    let { question } = body;
    if (!question) return res.status(400).json({ error: "Missing 'question' in body" });

    question = String(question).slice(0, 2000);

    const key = process.env.GOOGLE_API_KEY;
    if (!key) return res.status(500).json({ error: "GOOGLE_API_KEY missing" });

    // ✅ Correct model ID with "models/" prefix
    const url = `https://generativelanguage.googleapis.com/v1/models/models/gemini-2.5-flash:generateContent?key=${key}`;
    const payload = {
      contents: [{ parts: [{ text: question }] }],
      generationConfig: { maxOutputTokens: 300 }
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await resp.json().catch(() => ({}));

    // Handle errors gracefully
    if (!resp.ok) {
      const msg = json?.error?.message || "Unknown error";
      return res.status(resp.status).json({ error: msg });
    }

    // Handle safety blocks
    if (json?.promptFeedback?.blockReason) {
      return res.status(200).json({
        answer: "That question triggered safety filters. Try rephrasing it for general info."
      });
    }

    // Extract text
    const text =
      json?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim() || "";

    return res.status(200).json({
      answer: text || "I couldn’t generate a clear answer. Try asking in a different way!"
    });

  } catch (e) {
    console.error("chat handler fatal:", e);
    return res.status(500).json({ error: "Chat failed", detail: String(e?.message || e) });
  }
}

