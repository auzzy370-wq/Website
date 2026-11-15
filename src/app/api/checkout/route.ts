import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentCustomer } from "@/lib/auth";
import { placeOrder } from "@/lib/orders";

const schema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  shippingMethodId: z.string(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1),
  address: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    region: z.string().min(1),
    postal: z.string().min(1),
    country: z.string().min(2),
  }),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const customer = await getCurrentCustomer();
    const order = await placeOrder(body, customer);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 400 },
    );
  }
}
