import { createRequire } from "module";
const require = createRequire(import.meta.url);
const genPkg = require("@google/generative-ai/package.json");

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ genaiVersion: genPkg.version });
}
