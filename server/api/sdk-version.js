export default async function handler(req, res) {
  const key = process.env.GOOGLE_API_KEY;
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${key}`
  );
  const json = await r.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(json);
}
