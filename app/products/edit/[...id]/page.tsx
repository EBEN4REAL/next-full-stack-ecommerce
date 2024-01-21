
"use client"

import Layout from "@/components/Layout";
import { useParams  } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import {ProductInfo} from "@/app/types/Productinfo"
import {HttpMethod, fetchData} from "@/Services/api"
import {config} from "@/config"

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const params = useParams<{ id: string }>()

  useEffect(() => {
    if (!params.id) {
      return;
    }
    const fetchProduct = async () => {
      try {
        const product = await fetchData<ProductInfo>(`${config.BASE_URL}/products?id=${params.id}`, HttpMethod.GET);
        setProductInfo(product);
      } catch (error) {
        throw error
      }
  };

  fetchProduct()
  }, [params.id]);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}