import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import {useProducts} from "@/hooks/useProducts"
import { HttpMethod, fetchData } from "@/Services/api";
import {config} from "@/config"
import { ProductInfo } from "@/app/types/Productinfo";
import { useCategories } from "@/hooks/useCategories";
import { Property } from "@/app/types/Category";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  properties: Array<{ name: string; values: string[] }>;
  parent?: { _id: string };
}

interface ProductFormProps {
  _id?: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  properties: Record<string, string>;
}

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}: ProductFormProps) {
  
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const {products, loading, updateProduct} = useProducts()
  const {categories, loading: categoriesLoading} = useCategories()
 
  async function saveProduct(ev: React.FormEvent) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    try {
      const payload = _id ? { ...data, _id } : undefined
      await updateProduct(payload)
    }catch (error) {
      throw error
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = ev.target?.files;
    // console.log("files", files)
    // const formData = new FormData();
    // for (const file of Array.from(files ?? [])) {
    //   formData.append(file.name, file);
    // }

    // await axios.post("/api/upload", formData);
    if (files && files?.length > 0) {
      // setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data
      });
      // setImages((oldImages) => [...oldImages, ...res.links]);
      // setIsUploading(false);
    }
  }

  function updateImagesOrder(images: string[]) {
    setImages(images);
  }

  function setProductProp(propName: string, value: string) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill: Array<{ name: string; values: string[] }> = [];
  
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    if (catInfo) {
      propertiesToFill.push(...catInfo.properties as unknown as { name: string; values: string[]; }[]);
      while (catInfo?.parent?._id) {
        const parentCat = categories.find(
          ({ _id }) => _id === catInfo?.parent?._id
        );
        if(parentCat) {
          propertiesToFill.push(...parentCat.properties as unknown as { name: string; values: string[]; }[]);
          catInfo = parentCat;
        }
        
      }
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <fieldset>
        <label htmlFor="product-name">Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          id="product-name"
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label htmlFor="product-category">Category</label>
        <select
          value={category}
          id="product-category"
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p, pIndex) => (
            <div key={p.name} className="">
              <label htmlFor={`product-property-${pIndex}`}>{p.name[0].toUpperCase() + p.name.slice(1)}</label>
              <div>
                <select
                  value={productProperties[p.name]}
                  id={`product-property-${pIndex}`}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label htmlFor="prod-photo">Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
        {/* <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
           
          </ReactSortable> */}
           {!!images?.length &&
              images.map((link, iIndex) => (
                <div
                  key={link}
                  className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                >
                  <img src={link}  className="rounded-lg" alt={`Product Image ${iIndex + 1}`} />
                </div>
              ))}
        
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label htmlFor="prod=photo" className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" id="prod-photo"  aria-label="Upload Image"/>
          </label>
        </div>
        <label htmlFor="prod-desc">Description</label>
        <textarea
          placeholder="description"
          value={description}
          id="prod-desc"
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label htmlFor="prod-price">Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          id="prod-price"
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
          </button>
        </fieldset>
      </form>
  )
}

