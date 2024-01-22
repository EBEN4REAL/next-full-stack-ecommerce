"use client"

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductInfo } from "@/app/types/Productinfo";
import {useRouter,  useParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const {id} = useParams<{ id: string }>()
  const {fetchProduct, deleteProduct: removeProduct} = useProducts()

  useEffect(() => {
    if (!id) {
      return;
    }
    getProduct()
  }, [id]);

  const getProduct = async () => {
    try {

      const product = await fetchProduct(id)
      setProductInfo(product || null);
    } catch (error) {
      throw error
    } 
  };

  function goBack() {
    router.push('/products');
  }

  async function deleteProduct() {
    await removeProduct(id)
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete
        &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <section className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="btn-red">Yes</button>
        <button
          className="btn-default"
          onClick={goBack}>
          NO
        </button>
      </section>
    </Layout>
  );
}