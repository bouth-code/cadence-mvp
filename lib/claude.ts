import Anthropic from '@anthropic-ai/sdk';

export interface DiagnosticResponse {
  score: number;
  scoreLabel: string;
  summary: string;
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedImpact: string;
  }>;
  nextSteps: string[];
}

const diagnosticSystemPrompt = `You are an expert organizational consultant specializing in business process automation and organizational optimization.

You analyze organizational responses to diagnostic questionnaires and provide actionable insights. Your analysis should be:
1. Data-driven and specific
2. Focused on automation and efficiency opportunities
3. Realistic and achievable
4. Prioritized by impact and urgency

Format your response as JSON with this exact structure:
{
  "score": <number 0-100>,
  "scoreLabel": "<Poor|Fair|Good|Excellent>",
  "summary": "<2-3 sentence summary of organizational state>",
  "recommendations": [
    {
      "title": "<recommendation title>",
      "description": "<detailed explanation>",
      "priority": "<high|medium|low>",
      "estimatedImpact": "<% time saved or similar metric>"
    }
  ],
  "nextSteps": ["<step 1>", "<step 2>", "<step 3>"]
}

Provide exactly 3 high-impact recommendations. Be specific and actionable.`;

export async function analyzeDiagnostic(responses: Record<string, string>): Promise<DiagnosticResponse> {
  const client = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
  });

  const userMessage = `
Please analyze the following organizational diagnostic responses and provide recommendations:

${Object.entries(responses)
  .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
  .join('\n\n')}

Provide your analysis as valid JSON.`;

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: diagnosticSystemPrompt,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  // Extract text from the response
  const responseText =
    message.content[0].type === 'text' ? message.content[0].text : '';

  // Parse JSON response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse diagnostic response');
  }

  const result = JSON.parse(jsonMatch[0]) as DiagnosticResponse;

  // Validate and ensure structure
  if (
    !result.score ||
    !result.scoreLabel ||
    !result.summary ||
    !result.recommendations ||
    !result.nextSteps
  ) {
    throw new Error('Invalid diagnostic response structure');
  }

  return result;
}

export async function* streamDiagnosticAnalysis(
  responses: Record<string, string>
): AsyncGenerator<string> {
  const client = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
  });

  const userMessage = `
Please analyze the following organizational diagnostic responses and provide recommendations:

${Object.entries(responses)
  .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
  .join('\n\n')}

Provide your analysis as valid JSON.`;

  const stream = await client.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: diagnosticSystemPrompt,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      yield chunk.delta.text;
    }
  }
}
