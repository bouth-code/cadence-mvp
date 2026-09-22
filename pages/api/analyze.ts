import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { companyName, currentChallenges } = req.body

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are a business automation expert. Provide a brief, actionable audit of the following business challenges and suggest 3 top automation opportunities.

Company: ${companyName}
Challenges: ${currentChallenges}

Provide a concise analysis with specific recommendations.`,
          },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error })
    }

    const analysis =
      data.content[0]?.type === "text" ? data.content[0].text : "No analysis"

    res.status(200).json({ analysis })
  } catch (error) {
    res.status(500).json({ error: "Failed to generate analysis" })
  }
}
