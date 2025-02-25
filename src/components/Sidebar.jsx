import { useEffect, useRef, useState } from "react";
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
  const [openMenus, setOpenMenus] = useState({});

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".profile-section")
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

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div
      className={`sidebar-container ${isOpen ? "show" : ""}`}
      ref={sidebarRef}
    >
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
            <button
              className={`sidebar-link btn-toggle ${
                openMenus["clock"] ? "open" : ""
              }`}
              onClick={() => toggleMenu("clock")}
            >
              <span>
                <i className="fas fa-clock"></i> 打卡
              </span>
              <i className="fas fa-chevron-down"></i>
            </button>
            <ul className={`submenu ${openMenus["clock"] ? "show" : ""}`}>
              <li>
                <Link to="/clock-in">打卡及補打卡</Link>
              </li>
              <li>
                <Link to="/clock-history">查詢打卡紀錄</Link>
              </li>
              <li>
                <Link to="/clock-reissue-history">查詢補打卡紀錄</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/leave-and-inquiry-records" className="sidebar-link">
              <i className="fas fa-file-alt"></i> 請假及查詢記錄
            </Link>
          </li>

          <li>
            <button
              className={`sidebar-link btn-toggle ${
                openMenus["approval"] ? "open" : ""
              }`}
              onClick={() => toggleMenu("approval")}
            >
              <span>
                <i className="fas fa-user-cog"></i> 簽核系統
              </span>
              <i className="fas fa-chevron-down"></i>
            </button>
            <ul className={`submenu ${openMenus["approval"] ? "show" : ""}`}>
              <li>
                <Link to="/approve-leave">假單審核</Link>
              </li>
              <li>
                <Link to="/approve-clock-reissue">補打卡審核</Link>
              </li>
            </ul>
          </li>

          {/* 🔹 權限管理 (可展開) */}
          <li>
            <button
              className={`sidebar-link btn-toggle ${
                openMenus["permissions"] ? "open" : ""
              }`}
              onClick={() => toggleMenu("permissions")}
            >
              <span>
                <i className="fa-solid fa-users-gear"></i> 權限管理
              </span>
              <i className="fas fa-chevron-down"></i>
            </button>
            <ul className={`submenu ${openMenus["permissions"] ? "show" : ""}`}>
              <li>
                <Link to="/user-management">人員管理</Link>
              </li>
              <li>
                <Link to="/role-permissions">權限修改</Link>
              </li>
            </ul>
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

export default Sidebar;
