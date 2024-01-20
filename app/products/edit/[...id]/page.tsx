
"use client"

import Layout from "@/components/Layout";
import { useRouter, useParams  } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import {ProductInfo} from "@/app/types/Productinfo"

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const params = useParams<{ id: string }>()

  useEffect(() => {
    if (!params.id) {
      return;
    }
    axios.get<ProductInfo>(`/api/products?id=${params.id}`).then(response => {
      setProductInfo(response.data);
    });
  }, [params.id]);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}