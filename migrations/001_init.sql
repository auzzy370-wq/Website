create table if not exists customers (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  full_name text not null,
  phone text,
  account_type text not null default 'retail',
  dealer_status text not null default 'none',
  company_name text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  metal text not null default 'gold',
  form text not null,
  weight_oz numeric(12, 4) not null,
  purity numeric(6, 4) not null,
  retail_premium_per_oz numeric(12, 2) not null,
  wholesale_premium_per_oz numeric(12, 2) not null,
  stock_qty integer not null default 0,
  image_key text not null,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists spot_prices (
  id text primary key,
  metal text not null unique,
  usd_per_oz numeric(12, 2) not null,
  source text not null,
  fetched_at timestamptz not null default now()
);

create table if not exists sessions (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  order_number text not null unique,
  customer_id text references customers(id) on delete set null,
  email text not null,
  full_name text not null,
  account_type text not null,
  status text not null default 'pending',
  subtotal_cents integer not null,
  shipping_cents integer not null,
  insurance_cents integer not null,
  total_cents integer not null,
  spot_gold_usd numeric(12, 2) not null,
  shipping_method text not null,
  shipping_address jsonb not null,
  payment_provider text not null default 'mock',
  payment_ref text,
  tracking_number text,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id text primary key,
  order_id text not null references orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  quantity integer not null,
  unit_price_cents integer not null,
  weight_oz numeric(12, 4) not null,
  premium_per_oz numeric(12, 2) not null
);

create table if not exists dealer_applications (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  company_name text not null,
  tax_id text,
  website text,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists idx_sessions_customer on sessions(customer_id);
create index if not exists idx_orders_customer on orders(customer_id);
create index if not exists idx_products_active on products(active);
create index if not exists idx_products_slug on products(slug);
