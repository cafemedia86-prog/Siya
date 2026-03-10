import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
    quantity: number; // in kilograms (kg)
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    itemCount: number;
    totalWeight: number; // total in kg
    updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('siya_quote_basket');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('siya_quote_basket', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity: string | number) => {
        const qtyNum = typeof quantity === 'string' ? parseInt(quantity.replace(/[^0-9]/g, '')) : quantity;

        setItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, quantity: qtyNum } : i);
            }
            return [...prev, { ...product, quantity: qtyNum }];
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(i => i.id !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemCount = items.length;
    const totalWeight = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, itemCount, totalWeight, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
