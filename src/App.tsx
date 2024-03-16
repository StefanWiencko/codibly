import { useMemo } from "react";
import NumberInput from "@/components/NumberInput";
import ProductTable from "@/components/ProductTable";
import { useSearchParam } from "@/contexts/SearchParamContext";
import { useQuery } from "@tanstack/react-query";
import { filterProductsById, getProductData } from "@/utils/products";
import debounce from "lodash/debounce";
import {
  API_PRODUCTS_QUERY_PARAMS,
  debounceTimeout,
  tableStructure,
} from "@/constansts";

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
    debounce(
      () => setSearchParam(API_PRODUCTS_QUERY_PARAMS.ID, val),
      debounceTimeout
    )();
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
      <ProductTable {...props} />
    </div>
  );
};

export default App;
