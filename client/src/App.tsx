import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignInPage from "./pages/SignInPage";
import AuthGuard from "./Routes/AuthGuard";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./Nav";
import { Provider } from "react-redux";
import { store } from "./store";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
    return <AuthGuard fallback={<div>Loading</div>}>{children}</AuthGuard>;
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <Guard authGuard guestGuard={false}>
          <Outlet />
        </Guard>
      </AuthProvider>
    </Provider>
  );
}

export default App;
