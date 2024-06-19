import { RouteObject, createBrowserRouter } from "react-router-dom";

import App from "../App";
import { normalRoute, protectedRoute } from "./route";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [...normalRoute, ...protectedRoute],
  },
];

export default routes;
