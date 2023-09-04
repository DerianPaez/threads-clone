import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import LayoutSpiral from "./components/LayoutSpiral";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSpiral />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
