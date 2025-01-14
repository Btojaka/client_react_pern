import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, { loader as editLoader } from "./views/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "products/:id/edit", // ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        loader: editLoader,
      },
      {
        path: "products/:id/delete", // ROA Pattern - Resource-oriented design
      },
    ],
  },
]);