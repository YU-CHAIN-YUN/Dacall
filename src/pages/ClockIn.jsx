import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./ClockIn.css";

function ClockIn() {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [showClockInAnim, setShowClockInAnim] = useState(false);
  const [showClockOutAnim, setShowClockOutAnim] = useState(false);

  const handleClockIn = () => {
    const now = new Date().toLocaleTimeString();
    setClockInTime(now);
    setShowClockInAnim(true);
    setTimeout(() => setShowClockInAnim(false), 500); // 0.5 秒後移除晃動動畫
  };

  const handleClockOut = () => {
    const now = new Date().toLocaleTimeString();
    setClockOutTime(now);
    setShowClockOutAnim(true);
    setTimeout(() => setShowClockOutAnim(false), 500); // 0.5 秒後移除晃動動畫
  };

  return (
    <>
      <div className="container-fluid clock-in-page d-flex">
        {/* 左側區域 (Logo + 按鈕) */}
        <div className="left-section">
          <div className="text-center">
            <img src="src/image/logo.png" alt="Dacall Logo" className="logo mb-3" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <button className="btn btn-dark mb-2 btn-feedback" onClick={handleClockIn}>
              上班打卡
            </button>
            <button className="btn btn-dark mb-2 btn-feedback" onClick={handleClockOut}>
              下班打卡
            </button>
            <button className="btn btn-dark mb-2 btn-feedback">
              補打卡
            </button>
            <button className="btn btn-dark btn-feedback">
              查詢打卡紀錄
            </button>
          </div>
        </div>

        {/* 右側區域 (打卡狀態框) */}
        <div className="right-section">
          <div className="status-cards">
            <div className="status-card">
              <img 
                src="src/image/Clock.png" 
                className={showClockInAnim ? "shake-anim" : ""}
                alt="Clock In Icon"
              />
              <p>上班</p>
              <p>{clockInTime || "尚未打卡"}</p>
            </div>
            <div className="status-card">
              <img 
                src="src/image/Home.png" 
                className={showClockOutAnim ? "shake-anim" : ""}
                alt="Clock Out Icon"
              />
              <p>下班</p>
              <p>{clockOutTime || "尚未打卡"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClockIn;
