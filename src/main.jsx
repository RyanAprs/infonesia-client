import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider
      value={{
        autoZIndex: false,
        zIndex: {
          modal: 1100,
          overlay: 1000,
          menu: 1000,
          tooltip: 1101,
          toast: 2000,
        },
        ripple: true,
        pt: {
          button: {
            root: {
              className:
                "outline-none border-0 focus:border-0 focus:outline-none focus:ring-0 box-shadow-none",
            },
          },
          toast: {
            root: {
              className: "m-0",
            },
          },
        },
      }}
    >
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
