import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPwd = process.env.ADMIN_PASSWORD;

  if (!adminPwd) {
    return NextResponse.json({ error: 'Admin not configured.' }, { status: 500 });
  }
  if (password !== adminPwd) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
