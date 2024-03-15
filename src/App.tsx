import { useMemo, useState } from "react";
import NumberInput from "@/components/NumberInput";
import BasicTable from "@/components/BasicTable";
import { useSearchParam } from "@/contexts/SearchParamContext";
import { Product, ProductTableStructure, ProductsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getProductData = async (page: number): Promise<ProductsResponse> => {
  const response = await fetch(
    `https://reqres.in/api/products?per_page=5&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Request failed with status code: " + response.status);
  }
  return response.json();
};

const tableStructure: ProductTableStructure = [
  { title: "Id", key: "id" },
  { title: "Name", key: "name" },
  { title: "Year", key: "year" },
];

const App = () => {
  const [inputValue, setInputValue] = useState<null | number>(null);
  // const [filteredProducts, setFilteredProducts] = useState<
  //   Product[] | undefined
  // >(undefined);
  const {
    params: { page },
  } = useSearchParam();

  const {
    isPending,
    isSuccess,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: () => getProductData(page),
  });

  const filterProductsById = (
    products: Product[] | undefined,
    id: number | null
  ) =>
    products?.filter((product) => {
      if (id === null) return true;
      if (id === product.id) return true;
      return false;
    });
  const filteredProducts = useMemo(
    () => filterProductsById(products?.data, inputValue),
    [products?.data, inputValue]
  );
  const props = {
    isPending,
    isSuccess,
    error,
    tableStructure,
    products: filteredProducts,
    totalPages: products?.total_pages,
  };

  return (
    <div className="max-w-[800px] mx-auto mt-10">
      <NumberInput
        className="max-w-40 mb-2"
        placeholder="Type id and press tab"
        onChange={(_, val) => setInputValue(val)}
        slotProps={{
          input: { maxLength: 15 },
        }}
      />
      <BasicTable<Product> {...props} />
    </div>
  );
};

export default App;
