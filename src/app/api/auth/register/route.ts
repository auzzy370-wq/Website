import { NextResponse } from "next/server";
import { z } from "zod";
import { registerCustomer } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  phone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const customer = await registerCustomer(body);
    return NextResponse.json({ customer });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    const status = message.includes("unique") || message.includes("duplicate") ? 409 : 400;
    return NextResponse.json(
      { error: status === 409 ? "Email already registered" : message },
      { status },
    );
  }
}
