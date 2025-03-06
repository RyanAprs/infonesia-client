import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // tema
import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css"; // icons

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <main className="font-poppins">
        <App />
      </main>
    </PrimeReactProvider>
  </StrictMode>
);
