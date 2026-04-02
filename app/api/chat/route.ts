import { GoogleGenerativeAI } from '@google/generative-ai';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { systemPrompt } from '@/lib/chatbot-prompt';

// Initialize core clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({
  url: redisUrl,
  token: redisToken,
}) : null;

// Configure rate limit parameters
const RATE_LIMIT_MAX_REQUESTS = 50;
const RATE_LIMIT_WINDOW_SECONDS = 3600; // 1 hour

export async function POST(req: Request) {
  try {
    // Basic rate limiting setup (only if Redis is configured)
    if (redis) {
      const ip = req.headers.get('x-forwarded-for') || 'anonymous_ip';
      const redisKey = `ratelimit:chat:${ip}`;
      
      // Check and increment rate limit counter
      const currentCount = await redis.incr(redisKey);
      if (currentCount === 1) {
        await redis.expire(redisKey, RATE_LIMIT_WINDOW_SECONDS);
      }

      if (currentCount > RATE_LIMIT_MAX_REQUESTS) {
        return NextResponse.json(
          { error: "Come back in a bit — or just email me." },
          { status: 429 } // Too Many Requests
        );
      }
    }

    const body = await req.json();
    const { history, message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: systemPrompt });

    // Format chat history for Gemini
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start a chat session
    const chat = model.startChat({
      history: formattedHistory,
    });

    // Send the latest user message
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
