import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import { InvoiceProvider } from "./context/InvoiceContext";

const setting = localStorage.getItem("is-dark-mode");

if (!setting) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", prefersDark);
} else {
  document.documentElement.classList.toggle("dark", setting == "true");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InvoiceProvider>
      <RouterProvider router={router} />
    </InvoiceProvider>
  </React.StrictMode>,
);
