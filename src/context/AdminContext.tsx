import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from '../constants';
import { supabase } from '../lib/supabase';

interface Inquiry {
    id: string;
    date: string;
    partner: string;
    company: string;
    interest: string;
    volume: string;
    status: 'Pending' | 'Replying' | 'Quoted' | 'Closed';
    email: string;
    country: string;
    message: string;
}

export interface CompanyInfo {
    name: string;
    email: string;
    phone: string;
    country: string;
    address: string;
}

interface AdminContextType {
    products: Product[];
    inquiries: Inquiry[];
    categories: Category[];
    companyInfo: CompanyInfo;
    isLoading: boolean;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    updateInquiryStatus: (id: string, status: Inquiry['status']) => Promise<void>;
    deleteInquiry: (id: string) => Promise<void>;
    addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => Promise<void>;
    updateCompanyInfo: (info: CompanyInfo) => Promise<void>;
}

const INITIAL_INQUIRIES: Inquiry[] = [
    { id: '1', date: '2024-03-01', partner: 'John Smith', company: 'Spice Traders UK', interest: 'Cardamom', volume: '500kg', status: 'Pending', email: 'john@spicetraders.co.uk', country: 'United Kingdom', message: 'Interested in premium grade cardamom for bulk distribution.' },
    { id: '2', date: '2024-03-01', partner: 'Elena Rossi', company: 'Milan Gourmet', interest: 'Darjeeling Tea', volume: '100kg', status: 'Replying', email: 'elena@milan.gourmet', country: 'Italy', message: 'Looking for First Flush Darjeeling for our gourmet stores.' },
    { id: '3', date: '2024-02-29', partner: 'Ahmed Khan', company: 'Dubai Spices Co', interest: 'Chilli Powder', volume: '2 Tons', status: 'Quoted', email: 'ahmed@dubaispices.co', country: 'UAE', message: 'Need high-pungency Teja chilli powder in 25kg bulk bags.' },
];

const INITIAL_COMPANY_INFO: CompanyInfo = {
    name: "Siya's Premium Spices & Teas",
    email: "wholesale@siyas.com",
    phone: "+91 9999990469",
    country: "India",
    address: "524, Sector 38, Gurgaon (HR), INDIA 122001"
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
    const [categories, setCategories] = useState<Category[]>(CATEGORIES);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(INITIAL_COMPANY_INFO);
    const [isLoading, setIsLoading] = useState(false); // Start as false to avoid "black screen", we fetch in background

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Only set loading if we actually have no data at all (rare)
            if (products.length === 0 && inquiries.length === 0) {
                setIsLoading(true);
            }

            // Fetch Categories
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('categories')
                .select('*');

            if (categoriesError) throw categoriesError;
            if (categoriesData && categoriesData.length > 0) {
                setCategories(categoriesData as Category[]);
            } else {
                setCategories(CATEGORIES); // Fallback to local constant if Supabase is empty
            }

            // Fetch Products
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: false });

            if (productsError) throw productsError;

            // Map snake_case to camelCase
            const mappedProducts = productsData.map(p => ({
                id: p.id,
                name: p.name,
                category: p.category,
                description: p.description,
                pricePerKg: Number(p.price_per_kg),
                minOrder: p.min_order,
                origin: p.origin,
                image: p.image,
                featured: p.featured
            }));

            // Fetch Inquiries
            const { data: inqsData, error: inqsError } = await supabase
                .from('inquiries')
                .select('*')
                .order('date', { ascending: false });

            if (inqsError) throw inqsError;

            // Fetch Company Info
            const { data: infoData, error: infoError } = await supabase
                .from('company_info')
                .select('*')
                .eq('id', 'main')
                .single();

            if (infoError && infoError.code !== 'PGRST116') throw infoError; // PGRST116 is "No rows found"

            setProducts(mappedProducts.length > 0 ? mappedProducts : INITIAL_PRODUCTS);
            setInquiries(inqsData.length > 0 ? inqsData as Inquiry[] : INITIAL_INQUIRIES);
            if (infoData) setCompanyInfo(infoData as CompanyInfo);

        } catch (error) {
            console.error('Error fetching data from Supabase:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addProduct = async (product: Omit<Product, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newProduct = { ...product, id };

        try {
            const { error } = await supabase.from('products').insert([{
                id,
                name: product.name,
                category: product.category,
                description: product.description,
                price_per_kg: product.pricePerKg,
                min_order: product.minOrder,
                origin: product.origin,
                image: product.image,
                featured: product.featured
            }]);

            if (error) throw error;
            setProducts([newProduct as Product, ...products]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
        try {
            const dbFields: any = {};
            if (updatedFields.name) dbFields.name = updatedFields.name;
            if (updatedFields.category) dbFields.category = updatedFields.category;
            if (updatedFields.description) dbFields.description = updatedFields.description;
            if (updatedFields.pricePerKg !== undefined) dbFields.price_per_kg = updatedFields.pricePerKg;
            if (updatedFields.minOrder !== undefined) dbFields.min_order = updatedFields.minOrder;
            if (updatedFields.origin) dbFields.origin = updatedFields.origin;
            if (updatedFields.image) dbFields.image = updatedFields.image;
            if (updatedFields.featured !== undefined) dbFields.featured = updatedFields.featured;

            const { error } = await supabase
                .from('products')
                .update(dbFields)
                .eq('id', id);

            if (error) throw error;
            setProducts(products.map(p => p.id === id ? { ...p, ...updatedFields } : p));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const addInquiry = async (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const date = new Date().toISOString().split('T')[0];
        const newInquiry: Inquiry = { ...inq, id, date, status: 'Pending' };

        try {
            const { error } = await supabase.from('inquiries').insert([newInquiry]);
            if (error) throw error;
            setInquiries([newInquiry, ...inquiries]);
        } catch (error) {
            console.error('Error adding inquiry:', error);
        }
    };

    const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
        try {
            const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
            if (error) throw error;
            setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status } : inq));
        } catch (error) {
            console.error('Error updating inquiry status:', error);
        }
    };

    const deleteInquiry = async (id: string) => {
        try {
            const { error } = await supabase.from('inquiries').delete().eq('id', id);
            if (error) throw error;
            setInquiries(inquiries.filter(inq => inq.id !== id));
        } catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    };

    const updateCompanyInfo = async (info: CompanyInfo) => {
        try {
            const { error } = await supabase
                .from('company_info')
                .upsert({ id: 'main', ...info });

            if (error) throw error;
            setCompanyInfo(info);
        } catch (error) {
            console.error('Error updating company info:', error);
        }
    };

    return (
        <AdminContext.Provider value={{
            products,
            inquiries,
            categories,
            companyInfo,
            isLoading,
            addProduct,
            updateProduct,
            deleteProduct,
            updateInquiryStatus,
            deleteInquiry,
            addInquiry,
            updateCompanyInfo
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdmin must be used within an AdminProvider');
    return context;
};
