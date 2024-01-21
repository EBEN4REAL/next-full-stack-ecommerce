
export  interface ProductInfo {
    _id: string;
    title: string;
    description: string;
    price: string;
    images: string[];
    category: string;
    properties: Record<string, string>;
}