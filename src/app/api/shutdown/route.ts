import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Shutting down..." });

  setTimeout(() => {
    process.kill(process.pid, "SIGTERM");
  }, 500);

  return response;
}
