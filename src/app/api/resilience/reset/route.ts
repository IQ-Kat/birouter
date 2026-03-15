import { NextResponse } from "next/server";

/**
 * POST /api/resilience/reset — Reset all circuit breakers and clear cooldowns
 */
export async function POST() {
  try {
    // Reset all circuit breakers
    const { getAllCircuitBreakerStatuses, getCircuitBreaker } =
      await import("@/shared/utils/circuitBreaker");

    const statuses = getAllCircuitBreakerStatuses();
    let resetCount = 0;

    for (const { name } of statuses) {
      const breaker = getCircuitBreaker(name);
      breaker.reset();
      resetCount++;
    }

    return NextResponse.json({
      ok: true,
      resetCount,
      message: `Reset ${resetCount} circuit breaker(s)`,
    });
  } catch (err: any) {
    console.error("[API] POST /api/resilience/reset error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to reset resilience state" },
      { status: 500 }
    );
  }
}
