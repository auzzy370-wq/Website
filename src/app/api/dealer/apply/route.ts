import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getCurrentCustomer } from "@/lib/auth";
import { sql } from "@/lib/db";

const schema = z.object({
  companyName: z.string().min(2),
  taxId: z.string().optional(),
  website: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const customer = await getCurrentCustomer();
    if (!customer) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }
    if (customer.dealer_status === "approved") {
      return NextResponse.json({ error: "Already approved" }, { status: 400 });
    }
    if (customer.dealer_status === "pending") {
      return NextResponse.json({ error: "Application already pending" }, { status: 400 });
    }

    const body = schema.parse(await request.json());
    // Demo storefront auto-approves so wholesale pricing can be verified end-to-end.
    // Production should leave status pending for desk review.
    const autoApprove = process.env.DEALER_REQUIRE_REVIEW !== "true";
    const status = autoApprove ? "approved" : "pending";

    await sql(
      `insert into dealer_applications (id, customer_id, company_name, tax_id, website, notes, status)
       values ($1,$2,$3,$4,$5,$6,$7)`,
      [
        nanoid(),
        customer.id,
        body.companyName,
        body.taxId ?? null,
        body.website ?? null,
        body.notes ?? null,
        status,
      ],
    );

    await sql(
      `update customers
       set dealer_status = $1, account_type = $2, company_name = $3
       where id = $4`,
      [status, autoApprove ? "wholesale" : customer.account_type, body.companyName, customer.id],
    );

    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Application failed" },
      { status: 400 },
    );
  }
}
