import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSettings();

    const customFaviconBase64 = settings?.customFaviconBase64;
    const customFaviconUrl = settings?.customFaviconUrl;

    let faviconData: string | null = null;

    if (customFaviconBase64) {
      faviconData = customFaviconBase64;
    } else if (customFaviconUrl) {
      try {
        const response = await fetch(customFaviconUrl);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const base64 = Buffer.from(uint8Array).toString("base64");
          const contentType = response.headers.get("content-type") || "image/png";
          faviconData = `data:${contentType};base64,${base64}`;
        }
      } catch (error) {
        console.error("Failed to fetch custom favicon:", error);
      }
    }

    if (!faviconData) {
      return NextResponse.redirect("/favicon.svg");
    }

    const match = faviconData.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.redirect("/favicon.svg");
    }

    const contentType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Favicon API error:", error);
    return NextResponse.redirect("/favicon.svg");
  }
}
