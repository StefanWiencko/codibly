import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { SearchParamProvider } from "@/contexts/SearchParamContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

test("Renders the main page", () => {
  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <SearchParamProvider>
          <App />
        </SearchParamProvider>
      </QueryClientProvider>
    </Router>
  );
  expect(true).toBeTruthy();
});
