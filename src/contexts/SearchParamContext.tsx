import { ReactNode, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

type Value = {
  params: {
    page: number;
    id: number | null;
  };
  setSearchParam: (key: string, value: string) => void;
};

const SearchParamContext = createContext<Value | undefined>(undefined);
const newSearchParameters: URLSearchParams = new URLSearchParams();

const SearchParamProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const idParam = searchParams.get("id");

  const page = pageParam === null ? 1 : parseInt(pageParam);
  const id = idParam === null ? null : parseInt(idParam);

  const setSearchParam = (key: string, value: string) => {
    newSearchParameters.set(key, value);

    console.log(newSearchParameters);
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
