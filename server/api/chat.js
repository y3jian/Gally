import { GoogleGenerativeAI } from "@google/generative-ai";
export const config = { maxDuration: 29 }; // Vercel serverless max is 30s
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).send("Gemini chat API is live. POST { question }.");
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    let { question } = body;
    if (!question) return res.status(400).json({ error: "Missing 'question' in body" });

    question = String(question).slice(0, 2000); // limit length

    const key = process.env.GOOGLE_API_KEY;
    if (!key) return res.status(500).json({ error: "GOOGLE_API_KEY missing" });

    // Force v1 (stops it from hitting v1beta)
    //const genAI = new GoogleGenerativeAI(key, { apiVersion: "v1" });
    //const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${key}`;
    const payload = { contents: [{ parts: [{ text: question }] }], 
                        generationConfig: {temperature: 0.2, topP: 0.95 },
                    };

    // tiny retry loop for 429/5xx
    let lastErr, resp, json;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        json = await resp.json().catch(() => ({}));
        if (resp.ok) break;
        // quota / rate limit / transient
        if (resp.status === 429 || resp.status >= 500) {
          await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
          continue;
        }
        // non-retryable error
        break;
      } catch (e) {
        lastErr = e;
        await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
      }
    }

    if (!resp?.ok) {
      const msg = json?.error?.message || String(lastErr || "Unknown error");
      // map common causes to friendly messages
      if (/safety/i.test(msg)) {
        return res.status(400).json({
          error: "That question triggered safety filters. Try rephrasing or asking for general info.",
          detail: msg,
        });
      }
      if (/quota|rate|exceed/i.test(msg) || resp?.status === 429) {
        return res.status(429).json({
          error: "We’re handling too many requests right now. Please try again in a moment.",
          detail: msg,
        });
      }
      return res.status(502).json({ error: "Upstream error from Gemini.", detail: msg });
    }

    const text = (json.candidates?.[0]?.content?.parts || [])
      .map(p => p.text || "")
      .join("")
      .trim();

    return res.status(200).json({ answer: text || "I couldn't find a clear answer. Try asking another way?" });
  } catch (e) {
    console.error("chat handler fatal:", e);
    return res.status(500).json({ error: "Chat failed", detail: String(e?.message || e) });
  }

}
