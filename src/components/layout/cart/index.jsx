"use client";

import Cookies from 'js-cookie';
import { ShoppingCartIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const Cart = () => {

    const pathname = usePathname();
    const [openCart, setOpenCart] = useState(false);
    const cartRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setOpenCart(false);
            }
        }

        if (openCart) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup event on unmount
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openCart]);


    // chechout fn
    const handleCheckout = (cartItems) => {

        setOpenCart(false);

        if (cartItems.length === 0) return;
    
        Cookies.set("cosmeticsCheckout", JSON.stringify(cartItems), { expires: 1 });
        router.push("/checkout");
    };


    // dummy data
    const products = [
        {
            id: 1,
            quantity: 2,
            title: "Blue Powerhouse Ampoule",
            price: "59.99",
            image: "https://i.ibb.co.com/ksDLyrdY/p1.webp"
        },
        {
            id: 2,
            quantity: 2,
            title: "Blue Powerhouse Ampoule",
            price: "59.99",
            image: "https://i.ibb.co.com/ksDLyrdY/p1.webp"
        },
        {
            id: 3,
            quantity: 2,
            title: "Blue Powerhouse Ampoule",
            price: "59.99",
            image: "https://i.ibb.co.com/ksDLyrdY/p1.webp"
        },
    ];

    const cartItems = [
        {
            id: 1,
            quantity: 2,
        },
        {
            id: 2,
            quantity: 2,
        },
        {
            id: 3,
            quantity: 2,
        },
    ];
    

    return (
        <div>

            {/* cart btn */}
            <button onClick={() => setOpenCart(true)} className={`${pathname.startsWith("/checkout") ? "md:hidden" : "hidden md:block"} fixed z-10 top-1/2 -translate-y-1/2 right-10  p-3 rounded-sm bg-primary hidden md:block`}>
                <div className='relative text-white'>
                    <ShoppingCartIcon size={28} />
                    <span className='absolute -top-2 -right-3 w-5 h-5 rounded-full bg-dark flex justify-center items-center text-white text-[12px]'>2</span>
                </div>
            </button>

              {/* cart content */}
              <div ref={cartRef} className={`w-[400px] h-[70%] bg-light fixed z-40 top-1/2 -translate-y-1/2 ${openCart ? "right-0" : "-right-[1000px]"} duration-300 border-2 shadow-lg text-dark`}>
                <div className='relative w-full h-full flex flex-col'>
                    <div className='sticky top-0 left-0 flex justify-between items-center bg-primary text-light p-4'>
                        <h2 className='font-bold'>Added Items 2</h2>
                        <button onClick={() => setOpenCart(false)}>
                            <X />
                        </button>
                    </div>

                    {/* Product List (Scrollable) */}
                    <div className="flex-1 overflow-y-scroll scrollbar-hide">
                        {products?.length === 0 ? (
                            <div className='flex flex-col items-center py-6 gap-2'>
                                <p className='font-semibold'>No Items Added!</p>
                                <Link href={"/collections"} onClick={() => setOpenCart(false)} className='button'>shop now</Link>
                            </div>
                        ) : (
                            products?.map(product => (
                                <div key={product.id} className="flex items-center gap-4 border-b px-2">
                                    <Image
                                        src={product?.image}
                                        alt={product?.title}
                                        width={70}
                                        height={70}
                                        className="rounded-sm"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">{product.title}</h3>
                                        <p className="text-xs text-gray-500">৳{product.price} x {product.quantity}</p>
                                    </div>
                                    <p className="font-semibold">৳{(Number(product.price) * product.quantity).toFixed(2)}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Sticky Buttons at the Bottom */}
                    <div className='absolute bottom-0 left-0 w-full grid grid-cols-2 bg-light shadow-md'>
                        <h3 className='bg-slate-200 py-2 text-center font-semibold'>Total: ৳100</h3>
                        <button onClick={() => handleCheckout(cartItems)} className='bg-primary py-2 text-center text-light'>Checkout</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cart;