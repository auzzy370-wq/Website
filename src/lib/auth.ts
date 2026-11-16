import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import { sql } from "./db";
import type { AccountType, Customer, DealerStatus } from "./types";

const SESSION_COOKIE = "kmg_session";
const SESSION_DAYS = 30;

function mapCustomer(row: {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  account_type: string;
  dealer_status: string;
  company_name: string | null;
}): Customer {
  return {
    id: row.id,
    email: row.email,
    full_name: row.full_name,
    phone: row.phone,
    account_type: row.account_type as AccountType,
    dealer_status: row.dealer_status as DealerStatus,
    company_name: row.company_name,
  };
}

export async function registerCustomer(input: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}): Promise<Customer> {
  const id = nanoid();
  const hash = await bcrypt.hash(input.password, 10);
  await sql(
    `insert into customers (id, email, password_hash, full_name, phone)
     values ($1, $2, $3, $4, $5)`,
    [id, input.email.toLowerCase().trim(), hash, input.fullName.trim(), input.phone ?? null],
  );
  const customer = await getCustomerById(id);
  if (!customer) throw new Error("Registration failed");
  await createSession(customer.id);
  return customer;
}

export async function loginCustomer(email: string, password: string): Promise<Customer | null> {
  const rows = await sql<{
    id: string;
    email: string;
    password_hash: string;
    full_name: string;
    phone: string | null;
    account_type: string;
    dealer_status: string;
    company_name: string | null;
  }>("select * from customers where email = $1", [email.toLowerCase().trim()]);
  const row = rows[0];
  if (!row) return null;
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return null;
  await createSession(row.id);
  return mapCustomer(row);
}

export async function logoutCustomer(): Promise<void> {
  const jar = await cookies();
  const sid = jar.get(SESSION_COOKIE)?.value;
  if (sid) {
    await sql("delete from sessions where id = $1", [sid]);
    jar.delete(SESSION_COOKIE);
  }
}

async function createSession(customerId: string): Promise<void> {
  const id = nanoid();
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await sql("insert into sessions (id, customer_id, expires_at) values ($1, $2, $3)", [
    id,
    customerId,
    expires.toISOString(),
  ]);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const rows = await sql<{
    id: string;
    email: string;
    full_name: string;
    phone: string | null;
    account_type: string;
    dealer_status: string;
    company_name: string | null;
  }>(
    "select id, email, full_name, phone, account_type, dealer_status, company_name from customers where id = $1",
    [id],
  );
  return rows[0] ? mapCustomer(rows[0]) : null;
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  const jar = await cookies();
  const sid = jar.get(SESSION_COOKIE)?.value;
  if (!sid) return null;
  const rows = await sql<{
    id: string;
    email: string;
    full_name: string;
    phone: string | null;
    account_type: string;
    dealer_status: string;
    company_name: string | null;
    expires_at: string | Date;
  }>(
    `select c.id, c.email, c.full_name, c.phone, c.account_type, c.dealer_status, c.company_name, s.expires_at
     from sessions s join customers c on c.id = s.customer_id
     where s.id = $1`,
    [sid],
  );
  const row = rows[0];
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await sql("delete from sessions where id = $1", [sid]);
    jar.delete(SESSION_COOKIE);
    return null;
  }
  return mapCustomer(row);
}
