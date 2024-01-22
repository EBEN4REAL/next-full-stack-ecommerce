
"use client"

import Layout from "@/components/Layout";
import { useParams  } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import {IProductResponse, ProductInfo} from "@/app/types/Productinfo"
import {HttpMethod, fetchData} from "@/Services/api"
import {config} from "@/config"
import { useProducts } from "@/hooks/useProducts";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const params = useParams<{ id: string }>()
  const {fetchProduct} = useProducts()

  useEffect(() => {
    if (!params.id) {
      return;
    }
    getProduct()
  }, [params.id]);

  const getProduct = async () => {
    try {

      const product = await fetchProduct(params.id)
      setProductInfo(product || null);
    } catch (error) {
      throw error
    } 
  };

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}