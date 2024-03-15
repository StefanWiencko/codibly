import { ReactNode, createContext, useContext, useState } from "react";
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
  const [, setSearchParams] = useSearchParams();
  const [paramsState, setParamsState] = useState<Params>({ page: 1, id: null });

  const setSearchParam = (key: keyof Params, value: number | null) => {
    if (!value) {
      newSearchParameters.delete(key);
    } else {
      newSearchParameters.set(key, value.toString());
    }
    setParamsState((prev) => {
      return { ...prev, [key]: value };
    });
    setSearchParams(newSearchParameters);
  };

  const params = {
    page: paramsState?.page ? paramsState?.page : 1,
    id: paramsState?.id ? paramsState?.id : null,
  };
  const value: Value = { params, setSearchParam };
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
