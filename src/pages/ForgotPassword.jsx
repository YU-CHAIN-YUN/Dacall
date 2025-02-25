import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("密碼重設信已發送，請檢查您的信箱。");
  };

  return (
    <div className="forgot-password-container">
      <img src="src/image/logo.png" alt="Dacall Logo" className="logo mt-4" />
      <div className="forgot-password-card p-4 mt-3">
        <h3 className="text-center">修改密碼</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email：</label>
            <input
              type="email"
              className="form-control"
              placeholder="請輸入 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
          <i className="fa-solid fa-circle-check px-2"></i>
            送出
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
      <Link to="/" className="back-to-login">
        返回登入
      </Link>
    </div>
  );
}

export default ForgotPassword;
