import { ProductTableStructure } from "@/types";

export const tableStructure: ProductTableStructure = [
  { title: "Id", key: "id" },
  { title: "Name", key: "name" },
  { title: "Year", key: "year" },
];

const API_URL = "https://reqres.in/api";

enum API_URL_PARTS {
  PRODUCTS = "/products",
}

enum API_PRODUCTS_QUERY_PARAMS {
  ID = "id",
  PAGE = "page",
  PER_PAGE = "per_page",
}

export const debounceTimeout = 500;

export const getProductsUrl = (per_page: number, page: number) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set(API_PRODUCTS_QUERY_PARAMS.PER_PAGE, per_page.toString());
  urlSearchParams.set(API_PRODUCTS_QUERY_PARAMS.PAGE, page.toString());

  return API_URL + API_URL_PARTS.PRODUCTS + "?" + urlSearchParams;
};
