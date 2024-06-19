// ** React Imports
import { createContext, ReactNode, useEffect, useState } from "react";

// ** Next Import
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

// ** Axios

// ** Config
import authConfig from "../config/auth";

// ** Types
// import { AuthValuesType, ErrCallbackType, UserData } from './types'
import { AuthValuesType, UserData } from "./types.ts";
import { useDispatch } from "react-redux";
// import { login as userLogin } from "src/store/apps/user";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

type LoginParams = {
  user: UserData;
  token: string;
  rememberMe?: boolean;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserData | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const dispath = useDispatch();

  // ** Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // const currentRoute = router.pathname

  // console.log(loading);

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(false);

      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      )!;
      const storedData = window.localStorage.getItem("userData")!;

      // if (storedData) {
      //   console.log('=1====', authConfig.meEndpoint)
      //   setUser({ ...JSON.parse(storedData) })
      // } else {
      //   console.log('=2====')
      //   window.localStorage.removeItem('userData')
      //   window.localStorage.removeItem(authConfig.storageTokenKeyName)
      //   router.push('/login')
      //   setLoading(false)
      // }

      if (storedToken && storedData) {
        // setLoading(false)
        // dispath(userLogin(JSON.parse(storedData)));

        setUser({ ...JSON.parse(storedData) });
      } else {
        window.localStorage.removeItem("userData");
        window.localStorage.removeItem(authConfig.storageTokenKeyName);
        navigate("/login");
        setLoading(false);
      }
    };

    //setLoading(false)
    //setLoading(false)
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (params: LoginParams) => {
    params.rememberMe
      ? window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          params?.token || ""
        )
      : null;
    const returnUrl = "/login"; // Default to '/' if returnUrl is not provided
    setUser({ ...params.user });

    params.rememberMe
      ? window.localStorage.setItem("userData", JSON.stringify(params.user))
      : null;

    // dispath(userLogin(params.user));

    const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

    navigate(redirectURL as string);
  };

  const handleRegister = (params: LoginParams) => {
    params.rememberMe
      ? window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          params?.token || ""
        )
      : null;
    const returnUrl = "/register"; // Default to '/' if returnUrl is not provided
    setUser({ ...params.user });

    params.rememberMe
      ? window.localStorage.setItem("userData", JSON.stringify(params.user))
      : null;

    // dispath(userLogin(params.user));

    const redirectURL =
      returnUrl && returnUrl !== "/dashboard" ? returnUrl : "/dashboard";

    navigate(redirectURL as string);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    navigate("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,

    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
