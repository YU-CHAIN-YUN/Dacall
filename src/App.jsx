import { useState } from "react"; // ✅ 確保 useState 正確導入
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar"; // ✅ 確保 Sidebar 有正確導入
import Login from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ClockIn from "./pages/ClockIn";

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
          <Route path="/clockin" element={isAuthenticated ? <ClockIn /> : <Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
