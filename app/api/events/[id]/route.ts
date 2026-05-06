import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redis = Redis.fromEnv();
const KEY = 'club:events';

interface ClubEvent { id: string; [key: string]: unknown; }

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const events = (await redis.get<ClubEvent[]>(KEY)) ?? [];
  const updated = events.map(e => (e.id === id ? { ...e, ...body } : e));
  await redis.set(KEY, updated);
  return NextResponse.json(updated.find(e => e.id === id));
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const events = (await redis.get<ClubEvent[]>(KEY)) ?? [];
  await redis.set(KEY, events.filter(e => e.id !== id));
  return NextResponse.json({ ok: true });
}