// ** React Imports
import { ReactNode, ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ** Hooks Import
import { useAuth } from "../hooks/useAuth";
import { normalRoute, protectedRoute } from "../utils/route";
import getHomeRoute from "../utils/getHomeRoute";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  const currentPath = location.pathname + location.search; // Combine pathname and search to get the complete path

  const userData = localStorage.getItem("userData");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Simulate router readiness with a delay
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);

  // useEffect(() => {
  //   if (auth.user && location.pathname === "/") {
  //     const roleName = "admin";

  //     console.log("auth", auth);

  //     const homeRoute = getHomeRoute(roleName);
  //     navigate(homeRoute);
  //   }
  // }, [auth.user, location.pathname]);

  useEffect(() => {
    console.log("change", isReady);

    if (!isReady) {
      // console.log("isReady");
      return;
    }

    // Check authentication and navigate if necessary
    if (auth.user === null && !localStorage.getItem("userData")) {
      const check = normalRoute[0].children?.find(
        (v) => `/${v.path}` === currentPath
      );

      if (check) {
        navigate(currentPath);
      } else {
        navigate("/login");
      }
    } else {
      const check = protectedRoute[0].children?.find(
        (v) => `/${v.path}` === currentPath
      );

      const roleName = "admin";
      const homeRoute = getHomeRoute(roleName);
      console.log(roleName, check, homeRoute);
      if (check) {
        navigate(currentPath);
      } else {
        navigate(homeRoute);
      }
    }
  }, [auth.user, isReady, userData, token]);

  if (!isReady || auth.loading || auth.user === null) {
    return fallback;
  }
  return <>{children}</>;
};

export default AuthGuard;
