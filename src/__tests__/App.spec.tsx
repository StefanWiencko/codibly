import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { SearchParamProvider } from "@/contexts/SearchParamContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getProductsUrl } from "@/constansts";
import { Product } from "@/types";
import { filterProductsById } from "@/utils/products";

const productsMock: Product[] = [
  {
    id: 1,
    name: "cerulean",
    year: 2000,
    color: "#98B2D1",
    pantone_value: "15-4020",
  },
  {
    id: 2,
    name: "fuchsia rose",
    year: 2001,
    color: "#C74375",
    pantone_value: "17-2031",
  },
  {
    id: 3,
    name: "true red",
    year: 2002,
    color: "#BF1932",
    pantone_value: "19-1664",
  },
  {
    id: 4,
    name: "aqua sky",
    year: 2003,
    color: "#7BC4C4",
    pantone_value: "14-4811",
  },
  {
    id: 5,
    name: "tigerlily",
    year: 2004,
    color: "#E2583E",
    pantone_value: "17-1456",
  },
];

const queryClient = new QueryClient();
const Providers = ({ children }: { children: ReactNode }) => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <SearchParamProvider>{children}</SearchParamProvider>
    </QueryClientProvider>
  </Router>
);

describe("When app starts", () => {
  it("Renders correctly", () => {
    render(
      <Providers>
        <App />
      </Providers>
    );

    expect(true).toBeTruthy();
  });
});

describe("When filtering products data", () => {
  it("Returns all products when id is null", () => {
    const filteredProducts = filterProductsById(productsMock, null);

    expect(filteredProducts).toEqual(productsMock);
  });

  it("Returns single product with given id", () => {
    const filteredProducts = filterProductsById(productsMock, 1);
    const filteredResult = [
      {
        id: 1,
        name: "cerulean",
        year: 2000,
        color: "#98B2D1",
        pantone_value: "15-4020",
      },
    ];

    expect(filteredProducts).toEqual(filteredResult);
  });
});

describe("When generating product url string", () => {
  it("Returns correct value", () => {
    const urlString = getProductsUrl(5, 5);

    expect(urlString).toEqual(
      "https://reqres.in/api/products?per_page=5&page=5"
    );
  });
});
