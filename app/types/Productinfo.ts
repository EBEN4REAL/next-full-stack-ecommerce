
export  interface ProductInfo {
    _id: string;
    title: string;
    description: string;
    price: string;
    images: string[];
    category: string;
    properties: Record<string, string>;
}

export interface IProductResponse {
    id: string;
    title: string;
    description: string;
    price: string,
    images: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    category: string;
}