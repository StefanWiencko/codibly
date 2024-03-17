import { API_PRODUCTS_QUERY_PARAMS } from "@/constansts";
import { ReactNode, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

type Params = {
  page: number;
  id: number | null;
};

type Value = {
  params: Params;
  setSearchParam: (key: keyof Params, value: number | null) => void;
};

const SearchParamContext = createContext<Value | undefined>(undefined);
const newSearchParameters: URLSearchParams = new URLSearchParams();

const SearchParamProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get(API_PRODUCTS_QUERY_PARAMS.PAGE);
  const idParam = searchParams.get(API_PRODUCTS_QUERY_PARAMS.ID);

  const page = pageParam === null ? 1 : parseInt(pageParam);
  const id = idParam === null ? null : parseInt(idParam);

  const setSearchParam = (key: keyof Params, value: number | null) => {
    if (!value) {
      newSearchParameters.delete(key);
    } else {
      newSearchParameters.set(key, value.toString());
    }
    setSearchParams(newSearchParameters);
  };

  const params = { page, id };
  const value = { params, setSearchParam };

  return (
    <SearchParamContext.Provider value={value}>
      {children}
    </SearchParamContext.Provider>
  );
};

const useSearchParam = () => {
  const context = useContext(SearchParamContext);
  if (context === undefined) {
    throw new Error("useSearchParam must be used within a SearchParamProvider");
  }
  return context;
};
export { SearchParamProvider, useSearchParam };
