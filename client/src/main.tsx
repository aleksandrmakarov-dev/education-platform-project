import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BreadcrumbsProvider } from "./hooks/useBreadcrumbs.tsx";
import { SnackbarProvider } from "./hooks/useSnackbar.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
    },
    mutations: {
      retry: 0,
      cacheTime: 0,
    },
  },
});

const disabledRoutes = [
  "/dictionaries/:dictionaryId/themes",
  "/practice/:themeSlug",
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <BreadcrumbsProvider disabledRoutes={disabledRoutes}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BreadcrumbsProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
