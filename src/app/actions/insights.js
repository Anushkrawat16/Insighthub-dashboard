"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const defaultPrompt = "Summarize key growth opportunities and anomalies.";

export async function generateInsights({ dataset = [], prompt = defaultPrompt }) {
  const instruction = `
You are an expert data analyst.
Review the provided dataset and user prompt.
1. Identify key growth opportunities.
2. Highlight anomalies or outliers.
3. Provide a concise summary.
4. Provide up to 3 actionable recommendations.

Return ONLY valid JSON with this shape (no markdown):
{
  "summary": "string",
  "trends": ["string"],
  "patterns": ["string"],
  "anomalies": ["string"],
  "recommendations": ["string"]
}

Dataset: ${JSON.stringify(dataset)}
User Prompt: ${prompt}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a precise analyst that only returns valid JSON responses." },
      { role: "user", content: instruction },
    ],
    max_completion_tokens: 512,
    temperature: 0.2,
  });

  const content = response.choices[0].message.content?.trim() ?? "";
  try {
    const parsed = JSON.parse(content);
    return {
      summary: parsed.summary ?? "",
      trends: Array.isArray(parsed.trends) ? parsed.trends : [],
      patterns: Array.isArray(parsed.patterns) ? parsed.patterns : [],
      anomalies: Array.isArray(parsed.anomalies) ? parsed.anomalies : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    };
  } catch {
    return {
      summary: content || "Unable to parse insights.",
      trends: [],
      patterns: [],
      anomalies: [],
      recommendations: [],
    };
  }
}

