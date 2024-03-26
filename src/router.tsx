import { Home, Invoice } from "@/pages";
import { Layout } from "@/components";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/invoice/:id",
        element: <Invoice />,
      },
    ],
  },
]);
