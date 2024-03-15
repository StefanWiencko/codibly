import { Product, ProductsResponse } from "@/types";

export const filterProductsById = (
  products: Product[] | undefined,
  id: number | null
) =>
  products?.filter((product) => {
    if (id === null) return true;
    if (id === product.id) return true;
    return false;
  });

export const getProductData = async (
  page: number
): Promise<ProductsResponse> => {
  const response = await fetch(
    `https://reqres.in/api/products?per_page=5&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Request failed with status code: " + response.status);
  }
  return response.json();
};
