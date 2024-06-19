import React from "react";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import routes from "./utils/navigation";

const router = createBrowserRouter(routes);

const Nav = () => {
  return <RouterProvider router={router} />;
};

export default Nav;
