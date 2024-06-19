import Dashboard from "../pages/Dashboard";
import Login from "../pages/SignInPage";
import Register from "../pages/SignUpPage";

export const normalRoute: T[] = [
  {
    path: "/",
    children: [
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export const protectedRoute: T[] = [
  {
    path: "/",
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];
