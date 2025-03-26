import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import createCache from "@emotion/cache";
import pallet from "./scss/variables.module.scss";
import { BrowserRouter } from "react-router";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// In mui takes first prefrence on css file instead of default
const cache = createCache({
  key: "css",
  prepend: true,
});

// mui theme
const theme = createTheme({
  typography: {
    fontFamily: `${pallet.fontFamily}, sans-serif`,
    fontWeightMedium: pallet.fontWeight,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000",
          },
          borderRadius: "12px",
          borderColor: "#000",
          backgroundColor: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          minWidth: "100px",
          boxShadow: "none",
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: pallet.primary,
    },
    secondary: {
      main: pallet.secondary,
    },
    error: {
      main: pallet.error,
    },
    warning: {
      main: pallet.warning,
    },
    success: {
      main: pallet.success,
    },
    text: {
      primary: pallet.text,
      secondary: pallet.secondaryText,
    },
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={cache}>
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </CacheProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
