-- 1. Populate Categories
INSERT INTO categories (id, name, slug, description, image) VALUES
('1', 'Spices', 'spices', 'Premium Indian spices and powders, from whole chillies to artisanal blends.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'),
('2', 'Dry Fruits', 'dry-fruits', 'Premium quality nuts and dried fruits sourced from the best origins.', 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=800'),
('3', 'Teas', 'teas', 'Exquisite black, green, and white teas from India''s finest estates.', 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800'),
('4', 'Herbal Teas', 'herbal-teas', 'Natural infusions and wellness teas for a healthy lifestyle.', 'https://images.unsplash.com/photo-1576092729250-a9c58e737a6b?auto=format&fit=crop&q=80&w=800'),
('5', 'Pulses & Lentils', 'pulses-lentils', 'Nutritious Indian pulses and lentils for wholesale export.', 'https://images.unsplash.com/photo-1585993002159-29528973a12a?auto=format&fit=crop&q=80&w=800'),
('6', 'Other Products', 'other-products', 'Premium Basmati rice, tamarind, jaggery, and more.', 'https://images.unsplash.com/photo-1586201327693-86629f7bb1f3?auto=format&fit=crop&q=80&w=800')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    image = EXCLUDED.image;

-- 2. Populate Products
INSERT INTO products (id, name, category, description, price_per_kg, min_order, origin, image, featured) VALUES
('s1', 'Teja Red Chilli', 'spices', 'Highly pungent red chilli variety with a fiery heat and vibrant red color.', 18, 100, 'Guntur, India', 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=90&w=1000', false),
('s2', 'Turmeric Finger', 'spices', 'Premium quality whole turmeric fingers with high curcumin content.', 12, 50, 'Erode, India', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=90&w=1000', false),
('s3', 'Green Cardamom (Elaichi)', 'spices', 'Extra large green cardamom pods with intense aroma and flavor.', 42, 10, 'Kerala, India', 'https://finebuy.co.in/wp-content/uploads/2022/07/Green-Cardamom.webp', true),
('s4', 'Black Pepper', 'spices', 'Bold black peppercorns with a sharp, spicy flavor and woody aroma.', 15, 25, 'Malabar, India', 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=90&w=1000', false),
('s5', 'Garam Masala', 'spices', 'Traditional blend of ground spices for authentic Indian flavor.', 22, 20, 'Mumbai, India', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=90&w=1000', false),
('t1', 'Assam CTC Black Tea', 'teas', 'Strong, full-bodied black tea with a malty flavor, perfect for milk tea.', 14, 50, 'Assam, India', 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=90&w=1000', false),
('t2', 'Darjeeling Black Tea', 'teas', 'The "Champagne of Teas" with a delicate, floral, and muscatel flavor.', 65, 10, 'Darjeeling, India', 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=90&w=1000', true),
('t3', 'Premium Green Tea', 'teas', 'Fresh and light green tea leaves rich in antioxidants.', 35, 20, 'Nilgiri, India', 'https://images.unsplash.com/photo-1582722872445-44c567c318d7?auto=format&fit=crop&q=90&w=1000', false),
('ht1', 'Tulsi (Holy Basil) Tea', 'herbal-teas', 'Sacred herb infusion known for its stress-relieving and healing properties.', 28, 15, 'India', 'https://images.unsplash.com/photo-1626125336173-982462303732?auto=format&fit=crop&q=90&w=1000', false),
('ht2', 'Chamomile Tea', 'herbal-teas', 'Whole chamomile flowers for a calming and soothing herbal infusion.', 32, 10, 'India', 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=90&w=1000', false),
('df1', 'Cashew Nuts (W240)', 'dry-fruits', 'Premium whole white cashew nuts, large size and buttery texture.', 16, 25, 'Konkan, India', 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=90&w=1000', true),
('df2', 'Premium Almonds', 'dry-fruits', 'Sweet, crunchy almonds sourced from the finest orchards.', 14, 25, 'California/India', 'https://images.unsplash.com/photo-1508029060042-5819df148ac9?auto=format&fit=crop&q=90&w=1000', false),
('df3', 'Pistachios', 'dry-fruits', 'Naturally opened, roasted and salted premium pistachios.', 24, 20, 'Iran/India', 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?auto=format&fit=crop&q=90&w=1000', false),
('p1', 'Kabuli Chickpeas', 'pulses-lentils', 'Large, creamy white chickpeas perfect for hummus and curries.', 8, 100, 'Maharashtra, India', 'https://images.unsplash.com/photo-1585993002159-29528973a12a?auto=format&fit=crop&q=90&w=1000', false),
('p2', 'Red Lentils (Masoor Dal)', 'pulses-lentils', 'Split red lentils that cook quickly and are highly nutritious.', 6, 100, 'Madhya Pradesh, India', 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=90&w=1000', false),
('o1', 'Basmati Rice (Long Grain)', 'other-products', 'Extra long grain aromatic basmati rice, aged for superior flavor.', 10, 500, 'Punjab, India', 'https://images.unsplash.com/photo-1586201327693-86629f7bb1f3?auto=format&fit=crop&q=90&w=1000', true),
('o2', 'Tamarind (Slab)', 'other-products', 'Seedless tamarind slabs with a perfect balance of sweet and sour.', 5, 50, 'South India', 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&q=90&w=1000', false),
('o3', 'Jaggery (Block)', 'other-products', 'Natural unrefined cane sugar blocks with a rich, caramel-like taste.', 4, 50, 'Kolhapur, India', 'https://images.unsplash.com/photo-1608327133347-2485043d3b74?auto=format&fit=crop&q=90&w=1000', false)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    price_per_kg = EXCLUDED.price_per_kg,
    min_order = EXCLUDED.min_order,
    origin = EXCLUDED.origin,
    image = EXCLUDED.image,
    featured = EXCLUDED.featured;

-- 3. Populate Sample Inquiries
INSERT INTO inquiries (id, partner, company, interest, volume, status, email, country, message) VALUES
('inq1', 'John Stevenson', 'Global Spices Co.', 'Teja Red Chilli', '500kg', 'Pending', 'john@globalspices.com', 'United States', 'Interested in a monthly supply of Teja Red Chilli.'),
('inq2', 'Elena Petrova', 'EuroTrade Ltd.', 'Darjeeling Black Tea', '200kg', 'Quoted', 'elena@eurotrade.eu', 'Germany', 'Requesting samples for Darjeeling First Flush.'),
('inq3', 'Ibrahim Ali', 'Middle East Foods', 'Kabuli Chickpeas', '2 tons', 'Pending', 'ali@mefoods.ae', 'UAE', 'B2B inquiry for bulk pulses.');

-- 4. Set Company Info
INSERT INTO company_info (id, name, email, phone, country, address)
VALUES ('main', 'Siya''s Premium Spices & Teas', 'wholesale@siyas.com', '+91 9999990469', 'India', '524, Sector 38, Gurgaon (HR), INDIA 122001')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    country = EXCLUDED.country,
    address = EXCLUDED.address;
