import { nanoid } from "nanoid";
import { SHIPPING_OPTIONS } from "./catalog";
import { sql } from "./db";
import { getGoldSpot } from "./gold-price";
import { priceProduct, shippingQuote } from "./pricing";
import { getProductById } from "./products";
import type { AccountType, Customer } from "./types";

export type CheckoutInput = {
  email: string;
  fullName: string;
  items: { productId: string; quantity: number }[];
  shippingMethodId: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    region: string;
    postal: string;
    country: string;
  };
};

export async function placeOrder(input: CheckoutInput, customer: Customer | null) {
  const spot = await getGoldSpot();
  const accountType: AccountType =
    customer?.account_type === "wholesale" && customer.dealer_status === "approved"
      ? "wholesale"
      : "retail";

  const method = SHIPPING_OPTIONS.find((m) => m.id === input.shippingMethodId);
  if (!method) throw new Error("Invalid shipping method");

  const lines: {
    productId: string;
    productName: string;
    quantity: number;
    unitPriceCents: number;
    weightOz: number;
    premiumPerOz: number;
  }[] = [];

  for (const item of input.items) {
    if (item.quantity < 1) throw new Error("Invalid quantity");
    const product = await getProductById(item.productId);
    if (!product || !product.active) throw new Error("Product unavailable");
    if (product.stock_qty < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);
    const priced = priceProduct(product, spot.usd_per_oz, accountType);
    lines.push({
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      unitPriceCents: priced.unitPriceCents,
      weightOz: priced.weight_oz,
      premiumPerOz: priced.premiumPerOz,
    });
  }

  if (lines.length === 0) throw new Error("Cart is empty");

  const subtotalCents = lines.reduce((s, l) => s + l.unitPriceCents * l.quantity, 0);
  const totalOz = lines.reduce((s, l) => s + l.weightOz * l.quantity, 0);
  const { shippingCents, insuranceCents } = shippingQuote(method, totalOz, subtotalCents);
  const totalCents = subtotalCents + shippingCents + insuranceCents;

  const orderId = nanoid();
  const orderNumber = `KMG-${Date.now().toString(36).toUpperCase()}`;
  const paymentRef = `mock_${nanoid(10)}`;

  await sql(
    `insert into orders
     (id, order_number, customer_id, email, full_name, account_type, status, subtotal_cents, shipping_cents, insurance_cents, total_cents, spot_gold_usd, shipping_method, shipping_address, payment_provider, payment_ref)
     values ($1,$2,$3,$4,$5,$6,'paid',$7,$8,$9,$10,$11,$12,$13,'mock',$14)`,
    [
      orderId,
      orderNumber,
      customer?.id ?? null,
      input.email.toLowerCase().trim(),
      input.fullName.trim(),
      accountType,
      subtotalCents,
      shippingCents,
      insuranceCents,
      totalCents,
      spot.usd_per_oz,
      method.id,
      JSON.stringify(input.address),
      paymentRef,
    ],
  );

  for (const line of lines) {
    await sql(
      `insert into order_items (id, order_id, product_id, product_name, quantity, unit_price_cents, weight_oz, premium_per_oz)
       values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        nanoid(),
        orderId,
        line.productId,
        line.productName,
        line.quantity,
        line.unitPriceCents,
        line.weightOz,
        line.premiumPerOz,
      ],
    );
    await sql("update products set stock_qty = stock_qty - $1 where id = $2", [
      line.quantity,
      line.productId,
    ]);
  }

  return {
    id: orderId,
    orderNumber,
    totalCents,
    subtotalCents,
    shippingCents,
    insuranceCents,
    paymentRef,
    status: "paid" as const,
  };
}

export async function listOrdersForCustomer(customerId: string) {
  return sql<{
    id: string;
    order_number: string;
    status: string;
    total_cents: number;
    created_at: string | Date;
    tracking_number: string | null;
  }>(
    `select id, order_number, status, total_cents, created_at, tracking_number
     from orders where customer_id = $1 order by created_at desc`,
    [customerId],
  );
}
