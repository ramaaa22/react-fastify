import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FormItem from './FormItem';
import ListItem from './ListItem';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import FormProduct from './FormProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "items/create",
    element: <FormItem />,
  }, {
    path: "items/list",
    element: <ListItem />,
  },
  {
    path: "products/create",
    element: <FormProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);