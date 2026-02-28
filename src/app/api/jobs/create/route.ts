import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.workType || !body.zipCode || !body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: persist to Supabase jobs table
    console.log("[api/jobs/create] received:", body);

    return NextResponse.json({ ok: true, message: "Job request received" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
