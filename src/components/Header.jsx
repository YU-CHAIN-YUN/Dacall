import { useState, useRef, useEffect } from "react"; // ✅ 加入 useEffect
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Header.css";

function Header({ toggleSidebar }) {
  const [hasNotification] = useState(true);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({
    x: window.innerWidth - 80,
    y: 10,
  });
  const avatarRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // 監聽拖動開始
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - avatarPosition.x,
      y: e.clientY - avatarPosition.y,
    };
    e.preventDefault(); // 避免影響點擊事件
  };

  // 拖動頭像
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setAvatarPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  // 停止拖動
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // 確保全局監聽拖動事件
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <header className="header">
      {/* 左側漢堡按鈕 */}
      <div className="header-left">
        <button
          className="menu-btn"
          onClick={() => !isDragging.current && toggleSidebar()}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* 中間logo */}
      <div className="header-center">
        <a href="\clockin">
          <img
            src="src\image\logo.png"
            alt="header-logo"
            className="header-logo"
          />
        </a>
      </div>

      {/* 可拖動的個人頭像 */}
      <div className="header-right">
        <div
          className="profile-section"
          ref={avatarRef}
          style={{
            left: `${avatarPosition.x}px`,
            top: `${avatarPosition.y}px`,
          }}
          onMouseDown={handleMouseDown}
          onClick={() =>
            !isDragging.current && setShowNotificationBox(!showNotificationBox)
          } // ✅ 確保拖動時不觸發點擊
        >
          <img
            src="src\image\handshot.png"
            alt="User Avatar"
            className="profile-pic"
          />
          {hasNotification && <span className="red-dot"></span>}
        </div>

        {/* 通知欄（位於頭像左下角） */}
        {showNotificationBox && (
          <div
            className="notification-box"
            style={{
              left: `${avatarPosition.x - 200}px`,
              top: `${avatarPosition.y + 50}px`,
            }}
          >
            <p>
              <i className="fas fa-exclamation-circle"></i> 你有 1 則新訊息
            </p>
            <a href="#">查看</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
