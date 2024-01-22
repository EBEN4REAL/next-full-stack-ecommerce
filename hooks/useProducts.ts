import { useEffect, useState } from "react";
import { HttpMethod, fetchData } from "@/Services/api";
import { config } from "../config";
import { ProductInfo } from "@/app/types/Productinfo"



export const useProducts = () => {
    const [products, setProducts] = useState<ProductInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ success: false, message: string } | null>(null)

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await fetchData<ProductInfo[]>(`${config.BASE_URL}/products`, HttpMethod.GET);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setError(() => ({
                success: false,
                message: "Could not fetch products"
            }))
        }
    };

    const fetchProduct = async (_id: string) => {
        setLoading(true);
        try {
            const product = await fetchData<ProductInfo>(`${config.BASE_URL}/products?id=${_id}`, HttpMethod.GET);
            setLoading(false);
            return product
        } catch (error) {
            setError(() => ({
                success: false,
                message: "Could not fetch product"
            }))
        }
        fetchProducts()
    };

    const updateProduct = async (product: ProductInfo |undefined) => {
        try {
            setLoading(true);
            await fetchData<ProductInfo>(`${config.BASE_URL}/products`, HttpMethod.PUT, {...product});
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(() => ({
                success: false,
                message: "Could not update product"
            }))
        }
        fetchProducts()
    }

    const createProduct = async (product: ProductInfo) => {
        try {
            setLoading(true);
            await fetchData<ProductInfo>(`${config.BASE_URL}/products`, HttpMethod.POST, {...product});
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(() => ({
                success: false,
                message: "Could not create category"
            }))
        }
        fetchProducts()
    }

    const deleteProduct =  async (_id: string) => {
        try {
            setLoading(true);
            await fetchData<boolean>(`${config.BASE_URL}/products?id=${_id}`, HttpMethod.DELETE);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(() => ({
                success: false,
                message: "Could not delete category"
            }))
        }
        fetchProducts()
    }

    return { products, error, loading, createProduct, fetchProduct, updateProduct, deleteProduct };
};
