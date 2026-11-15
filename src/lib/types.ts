export type AccountType = "retail" | "wholesale";
export type DealerStatus = "none" | "pending" | "approved" | "rejected";
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  metal: string;
  form: string;
  weight_oz: number;
  purity: number;
  retail_premium_per_oz: number;
  wholesale_premium_per_oz: number;
  stock_qty: number;
  image_key: string;
  featured: boolean;
  active: boolean;
};

export type Customer = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  account_type: AccountType;
  dealer_status: DealerStatus;
  company_name: string | null;
};

export type SpotPrice = {
  metal: string;
  usd_per_oz: number;
  source: string;
  fetched_at: string;
  is_sample: boolean;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  weightOz: number;
  unitPriceCents: number;
  imageKey: string;
};

export type PricedProduct = Product & {
  unitPriceCents: number;
  premiumPerOz: number;
  spotUsed: number;
  pricingTier: "retail" | "wholesale";
};
