import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 監聽點擊事件，如果點擊到 Sidebar 外部，則關閉 Sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".profile-section") // 確保點擊頭像不會關閉
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`sidebar-container ${isOpen ? "show" : ""}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <h5>功能選單</h5>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="sidebar-body">
        <ul className="list-unstyled">
          <li>
            <Link to="/profile" className="sidebar-link">
              <i className="fas fa-user"></i> 個人帳戶管理
            </Link>
          </li>
          <li>
            <Link to="/clock-in" className="sidebar-link">
              <i className="fas fa-clock"></i> 打卡
            </Link>
          </li>
          <li>
            <Link to="/Leave-and-inquiry-records" className="sidebar-link">
              <i className="fas fa-file-alt"></i> 請假及查詢記錄
            </Link>
          </li>
          <li>
            <Link to="/approve-leave" className="sidebar-link">
              <i className="fas fa-user-cog"></i> 簽核系統
            </Link>
          </li>
          <li>
            <Link to="/Permission-Management" className="sidebar-link">
              <i className="fa-solid fa-users-gear"></i> 權限管理
            </Link>
          </li>
          <li>
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              登出
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar; // ✅ 確保有 `export default Sidebar`
