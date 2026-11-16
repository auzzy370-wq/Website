import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";

const schema = z.object({
  customerId: z.string().min(1),
  decision: z.enum(["approved", "rejected"]),
});

/**
 * Desk approval for dealer applications.
 * Requires DEALER_ADMIN_SECRET via header: x-dealer-admin-secret
 */
export async function POST(request: Request) {
  const expected = process.env.DEALER_ADMIN_SECRET?.trim() ?? "";
  if (!expected) {
    return NextResponse.json(
      { error: "Dealer desk approval is not configured" },
      { status: 503 },
    );
  }
  const provided = request.headers.get("x-dealer-admin-secret")?.trim() ?? "";
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = schema.parse(await request.json());
    const accountType = body.decision === "approved" ? "wholesale" : "retail";

    const updated = await sql<{ id: string }>(
      `update customers
       set dealer_status = $1, account_type = $2
       where id = $3 and dealer_status = 'pending'
       returning id`,
      [body.decision, accountType, body.customerId],
    );
    if (!updated[0]) {
      return NextResponse.json({ error: "No pending application for customer" }, { status: 404 });
    }

    await sql(
      `update dealer_applications
       set status = $1
       where customer_id = $2 and status = 'pending'`,
      [body.decision, body.customerId],
    );

    return NextResponse.json({ status: body.decision });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Approval failed" },
      { status: 400 },
    );
  }
}
