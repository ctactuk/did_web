import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/auth/LoginPage";
import SimpleSidebar from "./components/novigation/SideBarWithHeader.tsx";
import LogOut from "./components/auth/LogOut";
import SettingsPage from "./components/settings/settingsPage";
import Order from "./components/order/Order";
import DashboardPage from "./components/dashboard/DashboardPage";

function App() {
  const userAuthenticated = useSelector((state) => state.auth_info);

  return (
    <ChakraProvider>
      {!userAuthenticated.authenticated ? (
        <Login />
      ) : (
        <SimpleSidebar>
          <Router>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/logout" element={<LogOut />} />
            </Routes>
          </Router>
        </SimpleSidebar>
      )}
    </ChakraProvider>
  );
}

export default App;
