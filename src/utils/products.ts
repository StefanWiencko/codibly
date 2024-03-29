import { getProductsUrl } from "@/constansts";
import { Product, ProductsResponse } from "@/types";
import _filter from "lodash/filter";

export const filterProductsById = (
  products: Product[] | undefined,
  id: number | null
) => (id === null ? products : _filter(products, ["id", id]));

export const getProductData = async (
  page: number
): Promise<ProductsResponse> => {
  const response = await fetch(getProductsUrl(5, page));

  if (!response.ok) {
    throw new Error("Request failed with status code: " + response.status);
  }
  return response.json();
};
