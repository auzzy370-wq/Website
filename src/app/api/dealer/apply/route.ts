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

    await sql(
      `insert into dealer_applications (id, customer_id, company_name, tax_id, website, notes, status)
       values ($1,$2,$3,$4,$5,$6,'pending')`,
      [
        nanoid(),
        customer.id,
        body.companyName,
        body.taxId ?? null,
        body.website ?? null,
        body.notes ?? null,
      ],
    );

    await sql(
      `update customers
       set dealer_status = 'pending', company_name = $1
       where id = $2`,
      [body.companyName, customer.id],
    );

    return NextResponse.json({ status: "pending" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Application failed" },
      { status: 400 },
    );
  }
}
