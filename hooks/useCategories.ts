import { useEffect, useState } from "react";
import { HttpMethod, fetchData } from "@/Services/api";
import { config } from "../config";
import { Category } from "@/app/types/Category";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ success: false, message: string } | null>(null)

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await fetchData<Category[]>(`${config.BASE_URL}/categories`, HttpMethod.GET);
            setCategories(data);
            setLoading(false);
        } catch (error) {
            setError(() => ({
                success: false,
                message: "Could not fetch categories"
            }))
        }
    };

    const updateCategory = async (category: Category) => {
        try {
            setLoading(true);
            await fetchData<Category>(`${config.BASE_URL}/categories`, HttpMethod.PUT, {...category});
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(() => ({
                success: false,
                message: "Could not update category"
            }))
        }
        fetchCategories()
    }

    const createCategory = async (category: Category) => {
        try {
            setLoading(true);
            await fetchData<Category>(`${config.BASE_URL}/categories`, HttpMethod.POST, {...category});
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(() => ({
                success: false,
                message: "Could not create category"
            }))
        }
        fetchCategories()
    }

    const deleteCategory =  async (_id: string) => {
        try {
            setLoading(true);
           await fetchData<boolean>(`${config.BASE_URL}/categories?id=${_id}`, HttpMethod.DELETE);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(() => ({
                success: false,
                message: "Could not delete category"
            }))
        }
        fetchCategories()
    }

    return { categories, error, loading, updateCategory, deleteCategory, createCategory };
};
