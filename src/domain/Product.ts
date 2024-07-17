import { round } from "@/utils";

export type Product = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export function calcProductTotal(price: number, quantity: number) {
  return round(price * quantity);
}

export function createProduct(product: Omit<Product, "total">) {
  if (product.quantity <= 0) {
    throw new Error("Quantity should be bigger than 0");
  }

  return {
    ...product,
    total: calcProductTotal(product.price, product.quantity),
  };
}
