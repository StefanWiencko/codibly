import { useMemo } from "react";
import NumberInput from "@/components/NumberInput";
import BasicTable from "@/components/BasicTable";
import { useSearchParam } from "@/contexts/SearchParamContext";
import { Product, ProductTableStructure } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { filterProductsById, getProductData } from "@/utils/products";
import debounce from "lodash/debounce";

const tableStructure: ProductTableStructure = [
  { title: "Id", key: "id" },
  { title: "Name", key: "name" },
  { title: "Year", key: "year" },
];

const App = () => {
  const {
    params: { page, id },
    setSearchParam,
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

  const filteredProducts = useMemo(
    () => filterProductsById(products?.data, id),
    [products?.data, id]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_: any, val: number | null) => {
    debounce(() => setSearchParam("id", val), 500)();
  };
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
        className="max-w-44 mb-2"
        placeholder="Type id and press tab"
        onChange={handleChange}
        slotProps={{
          input: { maxLength: 18 },
        }}
      />
      <BasicTable<Product> {...props} />
    </div>
  );
};

export default App;
