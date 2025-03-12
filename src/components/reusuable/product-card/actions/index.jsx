"use client";

import useAxiosPublic from "@/app/hooks/axios/useAxiosPublic";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const ActionButtons = ({ productId }) => {

    const axiosPublic = useAxiosPublic();
    const router = useRouter();


    // add to cart fn
    const handleCartToCart = async (productId) => {
        console.log("hitted add to cart");

        const products = [{ productId, quantity: 1 }];
        const data = { products: products };

        try {
            console.log("hitted api block");

            const res = await axiosPublic.post("/api/cart/create", data);
            console.log(res.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    // buy now fn
    const handleBuyNow = (productId) => {
        const products = [{ id: productId, quantity: 1 }];

        Cookies.set("cosmeticsCheckout", JSON.stringify(products), { expires: 1 });
        router.push("/checkout");
    };


    return (
        <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 duration-500 opacity-100 lg:opacity-0 translate-y-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 z-10 flex justify-center items-center gap-1 ">
            <button onClick={() => handleCartToCart(productId)} className="bg-primary text-white px-2 py-1 md:px-5 md:py-2 rounded-sm font-semibold text-xs ">
                Add to Cart
            </button>
            <button onClick={() => handleBuyNow(productId)} className="bg-primary text-white px-2 py-1 md:px-5 md:py-2 rounded-sm font-semibold text-xs">
                Buy Now
            </button>
        </div>
    );
};

export default ActionButtons;