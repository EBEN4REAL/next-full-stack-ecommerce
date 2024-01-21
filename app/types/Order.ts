
interface LineItem {
    price_data: {
        product_data: {
          name: string;
        };
      };
      quantity: number;
}

interface Order {
    _id: string;
    createdAt: string;
    paid: boolean;
    name: string;
    email: string;
    city: string;
    postalCode: string;
    country: string;
    streetAddress: string;
    line_items: LineItem[];
  }