'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartToken, setCartToken] = useState(null);

    useEffect(() => {
        const fetchCartToken = async () => {
            try {
                const response = await fetch('/api/cart-token'); // Replace with your actual endpoint
                const data = await response.json();
                if (data?.token) {
                    Cookies.set('cart_token', data.token, { expires: 7 }); // Store token in cookies
                    setCartToken(data.token);
                }
            } catch (error) {
                console.error('Error fetching cart token:', error);
            }
        };

        if (!Cookies.get('cart_token')) {
            fetchCartToken();
        } else {
            setCartToken(Cookies.get('cart_token'));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cartToken }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
