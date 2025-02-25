import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("登入失敗，請檢查帳號或密碼");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        {/* Logo */}
        <img
          src="src\image\logo.png"
          alt="Dacall Logo"
          className="mb-3"
          style={{ width: "150px" }}
        />

        {/* 標題 */}
        <h3 className="mb-4">Signin with Email</h3>

        {/* 登入表單 */}
        <form
          onSubmit={handleLogin}
          className="w-100"
          style={{ maxWidth: "350px" }}
        >
          {/* Email 輸入框 */}
          <div className="input-group mb-3">
            <span className="input-group-text input-icon">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="請輸入 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 密碼輸入框 */}
          <div className="input-group mb-3">
            <span className="input-group-text input-icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </span>
          </div>

          {/* 忘記密碼 */}
          <div className="d-flex justify-content-end mb-3">
            <a href="/ForgotPassword" className="text-muted">
              忘記密碼
            </a>
          </div>

          {/* 登入按鈕（淡綠色 + 觸覺回饋） */}
          <button type="submit" className="btn btn-light-green w-100 mb-2">
            登入
          </button>

          {/* 註冊按鈕（灰色 + 觸覺回饋） */}
          <a href="/Register">
            <button type="button" className="btn btn-gray w-100">
              註冊
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
