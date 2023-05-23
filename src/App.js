import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/auth/LoginPage";
import SimpleSidebar from "./components/novigation/SideBarWithHeader.tsx";
import LogOut from "./components/auth/LogOut";
import SettingsPage from "./pages/settingsPage";
import Order from "./pages/Order";
import DashboardPage from "./pages/DashboardPage";
import User from "./pages/User";
import whisl_api from "./requests/whisl_api";
import { useEffect } from "react";
import { logout } from "./redux/slices/authSlice";
import Profile from "./pages/Profile";
import Customers from "./pages/Customer";

function App() {
  const userAuthenticated = useSelector((state) => state.auth_info);

  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token")
      ? localStorage.getItem("refresh_token")
      : "";
    const is_expired =
      refreshToken !== "" ? whisl_api.checkIfTokenExpired(refreshToken) : true;
    if (is_expired) {
      dispatch(logout({ authenticated: false }));
    }
  }, [dispatch]);

  return (
    <ChakraProvider>
      {!userAuthenticated.authenticated ? (
        <Login />
      ) : (
        <Router>
          <SimpleSidebar>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/users" element={<User />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<LogOut />} />
            </Routes>
          </SimpleSidebar>
        </Router>
      )}
    </ChakraProvider>
  );
}

export default App;
