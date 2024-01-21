import { useEffect, useState } from "react";
import { HttpMethod, fetchData } from "@/Services/api";
import { config } from "../config";
import { ProductInfo } from "@/app/types/Productinfo"



export const useProducts = () => {
    const [products, setProducts] = useState<ProductInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ success: false, message: string } | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const options = {
                method: "GET"
            }

            try {
                const Products = await fetchData<ProductInfo[]>(`${config.BASE_URL}/products`, HttpMethod.GET);
                setProducts(Products);
                setLoading(false);
            } catch (error) {
                setError(() => ({
                    success: false,
                    message: "Could not fetch products"
                }))
            }
        };

        fetchProducts();
    }, []);

    return { products, error, loading };
};
