"use client"

import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import swal, {SweetAlertOptions} from 'sweetalert2';
import { ProductInfo } from "../types/Productinfo";

function SettingsPage() {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [featuredProductId, setFeaturedProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    await axios.get('/api/products').then(res => {
      setProducts(res.data);
    });
    await axios.get('/api/settings?name=featuredProductId').then(res => {
      setFeaturedProductId(res.data.value);
    });
    await axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value);
    });
  }

  async function saveSettings() {
    setIsLoading(true);
    await axios.put('/api/settings', {
      name: 'featuredProductId',
      value: featuredProductId,
    });
    await axios.put('/api/settings', {
      name: 'shippingFee',
      value: shippingFee,
    });
    setIsLoading(false);
    await swal.fire({
      title: 'Settings saved!',
      icon: 'success',
    }as SweetAlertOptions);
  }

  return (
    <Layout>
      <h1>Settings</h1>
      {isLoading && (
        <Spinner fullWidth={false} />
      )}
      {!isLoading && (
        <>
          <label>Featured product</label>
          <select value={featuredProductId} onChange={ev => setFeaturedProductId(ev.target.value)}>
            {products.length > 0 && products.map(product => (
              <option value={product._id}>{product.title}</option>
            ))}
          </select>
          <label>Shipping price (in usd)</label>
          <input type="number"
                 value={shippingFee}
                 onChange={ev => setShippingFee(ev.target.value)}
          />
          <div>
            <button onClick={saveSettings} className="btn-primary">Save settings</button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default SettingsPage