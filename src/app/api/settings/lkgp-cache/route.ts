import { NextResponse } from "next/server";
import { clearAllLKGP } from "@/lib/db/settings";

export async function DELETE() {
  try {
    clearAllLKGP();
    return NextResponse.json({ cleared: true });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
