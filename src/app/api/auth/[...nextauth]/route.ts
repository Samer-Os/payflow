import { NextResponse } from "next/server";

// Auth is disabled in demo mode.
export function GET() {
  return NextResponse.json({ error: "Auth disabled in demo mode" }, { status: 404 });
}
export { GET as POST };
