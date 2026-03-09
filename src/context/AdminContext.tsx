import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from '../constants';

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
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
    deleteInquiry: (id: string) => void;
    addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
    updateCompanyInfo: (info: CompanyInfo) => void;
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
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem('siyas_products');
        return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    });

    const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
        const saved = localStorage.getItem('siyas_inquiries');
        return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    });

    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
        const saved = localStorage.getItem('siyas_company_info');
        return saved ? JSON.parse(saved) : INITIAL_COMPANY_INFO;
    });

    useEffect(() => {
        localStorage.setItem('siyas_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('siyas_inquiries', JSON.stringify(inquiries));
    }, [inquiries]);

    useEffect(() => {
        localStorage.setItem('siyas_company_info', JSON.stringify(companyInfo));
    }, [companyInfo]);

    const addProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
        setProducts([...products, newProduct as Product]);
    };

    const updateProduct = (id: string, updatedFields: Partial<Product>) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    };

    const deleteProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const addInquiry = (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
        const newInquiry: Inquiry = {
            ...inq,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            status: 'Pending'
        };
        setInquiries([newInquiry, ...inquiries]);
    };

    const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
        setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status } : inq));
    };

    const deleteInquiry = (id: string) => {
        setInquiries(inquiries.filter(inq => inq.id !== id));
    };

    const updateCompanyInfo = (info: CompanyInfo) => {
        setCompanyInfo(info);
    };

    return (
        <AdminContext.Provider value={{
            products,
            inquiries,
            categories: CATEGORIES,
            companyInfo,
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
