/**
 * API: OpenAPI "Try It" Proxy
 * POST — forwards a request to a local endpoint and returns the result
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method = "GET", path, headers = {}, body: reqBody } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Missing 'path' field" }, { status: 400 });
    }

    // Only allow requests to local endpoints for security
    if (!path.startsWith("/")) {
      return NextResponse.json({ error: "Path must start with /" }, { status: 400 });
    }

    // Build the target URL using the incoming request's origin
    const origin = request.headers.get("x-forwarded-proto")
      ? `${request.headers.get("x-forwarded-proto")}://${request.headers.get("host")}`
      : `http://${request.headers.get("host") || "localhost:20128"}`;

    const targetUrl = `${origin}${path}`;

    const start = performance.now();

    // Forward cookies/auth from the original request
    const forwardHeaders: Record<string, string> = {
      ...headers,
    };

    // Forward auth from the dashboard session
    const cookie = request.headers.get("cookie");
    if (cookie && !forwardHeaders["Cookie"]) {
      forwardHeaders["Cookie"] = cookie;
    }

    if (reqBody && !forwardHeaders["Content-Type"]) {
      forwardHeaders["Content-Type"] = "application/json";
    }

    const fetchOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: forwardHeaders,
    };

    if (reqBody && method.toUpperCase() !== "GET") {
      fetchOptions.body = typeof reqBody === "string" ? reqBody : JSON.stringify(reqBody);
    }

    const res = await fetch(targetUrl, fetchOptions);
    const latencyMs = Math.round(performance.now() - start);

    // Read response
    const contentType = res.headers.get("content-type") || "";
    let responseBody: any;

    if (contentType.includes("application/json")) {
      responseBody = await res.json();
    } else {
      const text = await res.text();
      // Truncate very large responses
      responseBody = text.length > 10000 ? text.slice(0, 10000) + "\n... (truncated)" : text;
    }

    // Collect response headers
    const responseHeaders: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
      body: responseBody,
      latencyMs,
      contentType,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 0,
        statusText: "Network Error",
        headers: {},
        body: { error: error.message || "Request failed" },
        latencyMs: 0,
        contentType: "application/json",
      },
      { status: 200 } // Return 200 so the frontend can display the error
    );
  }
}
