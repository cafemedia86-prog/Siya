-- Categories table
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT
);

-- Products table
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT REFERENCES categories(slug),
    description TEXT,
    price_per_kg DECIMAL(10, 2),
    min_order INTEGER,
    origin TEXT,
    image TEXT,
    featured BOOLEAN DEFAULT FALSE
);

-- Inquiries table
CREATE TABLE inquiries (
    id TEXT PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    partner TEXT NOT NULL,
    company TEXT,
    interest TEXT,
    volume TEXT,
    status TEXT CHECK (status IN ('Pending', 'Replying', 'Quoted', 'Closed')) DEFAULT 'Pending',
    email TEXT,
    country TEXT,
    message TEXT
);

-- Company Info table (Single row)
CREATE TABLE company_info (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT,
    email TEXT,
    phone TEXT,
    country TEXT,
    address TEXT
);

-- Initial insertion for company_info
INSERT INTO company_info (id, name, email, phone, country, address)
VALUES ('main', 'Siya''s Premium Spices & Teas', 'wholesale@siyas.com', '+91 9999990469', 'India', '524, Sector 38, Gurgaon (HR), INDIA 122001')
ON CONFLICT (id) DO NOTHING;
