import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import ClockIn from "./pages/ClockIn";
import ClockHistory from "./pages/ClockHistory";

import Footer from "./components/Footer"; // 引入 Footer

import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {isAuthenticated && <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
      {isAuthenticated && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/clockin" element={isAuthenticated ? <ClockIn /> : <Login />} />
          <Route path="/clock-history" element={isAuthenticated ?<ClockHistory /> : <Login />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
