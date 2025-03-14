import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <main className="font-poppins">
      <App />
    </main>
  </PrimeReactProvider>
);
