import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const stored = await redis.get<string>('club:password');

  if (!stored) {
    return NextResponse.json(
      { ok: false, error: 'No password set. Add club:password in your Upstash console.' },
      { status: 500 }
    );
  }

  if (password === stored) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
}