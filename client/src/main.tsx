import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import {
  BrandVariants,
  FluentProvider,
  Theme,
  createLightTheme,
  createDarkTheme,
  makeStyles,
} from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const myTheme: BrandVariants = {
  10: "#020206",
  20: "#131528",
  30: "#1B2247",
  40: "#202D62",
  50: "#24387F",
  60: "#26449C",
  70: "#2750BB",
  80: "#265CDA",
  90: "#3A69ED",
  100: "#5A77EF",
  110: "#7386F2",
  120: "#8895F4",
  130: "#9CA4F6",
  140: "#AFB4F8",
  150: "#C1C3FA",
  160: "#D2D4FC",
};

const lightTheme: Theme = {
  ...createLightTheme(myTheme),
};

const darkTheme: Theme = {
  ...createDarkTheme(myTheme),
  colorBrandForeground1: myTheme[110],
};

darkTheme.colorBrandForeground1 = myTheme[110];
darkTheme.colorBrandForeground2 = myTheme[120];

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={lightTheme}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </FluentProvider>
);
