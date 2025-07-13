import { NextFunction, Request, Response } from 'express';
import { LRUCache } from 'lru-cache';
import { v4 as uuidv4 } from 'uuid';

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
const sessions = new LRUCache<string, ChatMessage[]>({
  max: 500,                // Max number of sessions in memory
  ttl: 1000 * 60 * 15,     // Idle duration before session is deleted
  updateAgeOnGet: true     // If true, refresh TTL when session is accessed
});

const BASE_PROMPT = `
  You are a dramatic, high-stakes startup investor — think Shark Tank, but sharper, faster, and deeply focused on traction and truth.

  You react to founder pitches with bold flair, expressive emotion, and ruthless business logic. Your voice is short, punchy, and theatrical — you never ramble.

  Every response must be no more than 3 sentences, and you always end with one bold, emotionally charged question. Never respond with more than one question.

  You have access to real-world citations, startup data, and trends. Use them only if they help you challenge or praise the idea — don't explain them.

  Your focus is:  
  - Does the founder deeply understand the pain point and user behavior?  
  - Is the market opportunity real and urgent — or hype?  
  - Are there signs of real customer demand or just a nice pitch?

  Never summarize or restate the user's pitch or idea. Your entire response must focus on challenging, praising, or questioning the idea based on validation, market, and adoption insights. Be concise and direct. Always end with a single bold question. Be expressive — this is a show.

  Use simple, clear English — avoid fancy or complex words. Speak like a direct, tough investor who cuts through the fluff. Keep it friendly but sharp.
`;

export function newSession(req: Request, res: Response): void {
  const sessionId = uuidv4();
  sessions.set(sessionId, [{ role: 'system', content: BASE_PROMPT}]);
  res.status(200).json({ sessionId: sessionId });
}

export async function input(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { sessionId, userInput } = req.body;
  if (!sessionId || !userInput) {
    return res.status(400).json({ error: 'sessionId and userInput are required' });
  }

  let history = sessions.get(sessionId);
  if (!history) {
    return res.status(404).json({ error: 'Session not found' });
  }

  history.push({ role: 'user', content: userInput });

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.QNA_MODEL_NAME,
        messages: history,
        stream: true,
        web_search_options: {
          user_location: { country: 'SG' }
        }
      })
    });

    if (!response.ok || !response.body) {
      return res.status(500).json({ error: 'Failed to connect to Sonar' });
    }

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let assistantReply = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // keep incomplete line for next loop

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6); // remove 'data: '
        if (jsonStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const delta = parsed?.choices?.[0]?.delta?.content;
          if (delta) {
            assistantReply += delta;
            res.write(`data: ${delta}\n\n`); // Format is SSE compliant
          }
        } catch (err) {
          console.error('JSON parse error for:', jsonStr);
          console.error(err);
        }
      }
    }
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
}

export function endSession(req: Request, res: Response): void {
  const { sessionId } = req.body;
  if (!sessionId) {
    res.status(400).json({ error: 'sessionId is required' });
    return;
  }

  sessions.delete(sessionId);
  res.status(200).json({ message: 'Session ended' });
}