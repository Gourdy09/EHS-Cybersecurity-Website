import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const stored = process.env.ADMIN_PASSWORD;

  if (!stored) {
    return NextResponse.json(
      { ok: false, error: 'ADMIN_PASSWORD environment variable is not set.' },
      { status: 500 }
    );
  }

  if (password === stored) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
}