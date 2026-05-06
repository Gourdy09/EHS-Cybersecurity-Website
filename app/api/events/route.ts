import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redis = Redis.fromEnv();
const KEY = 'club:events';

export async function GET() {
  const events = await redis.get<object[]>(KEY);
  return NextResponse.json(events ?? []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const events = (await redis.get<object[]>(KEY)) ?? [];
  const newEvent = { ...body, id: Date.now().toString() };
  await redis.set(KEY, [...events, newEvent]);
  return NextResponse.json(newEvent, { status: 201 });
}