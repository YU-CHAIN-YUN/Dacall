import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("密碼與確認密碼不符");
      return;
    }
    setMessage("註冊成功！請重新登入。");
  };

  return (
    <div className="container d-flex flex-column align-items-center vh-100">
      <img src="src/image/logo.png" alt="Dacall Logo" className="logo mt-4" />
      <div className="register-box p-4 mt-3">
        <h3 className="text-center">建立帳號</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">人員姓名</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="請輸入您的姓名"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="請輸入 Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">性別</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">請選擇</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">密碼</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="請輸入密碼"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">確認密碼</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="請再次輸入密碼"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-brown w-100">
            <i className="fas fa-user-plus"></i> 建立帳號
          </button>
        </form>
        {message && <p className="text-danger mt-3 text-center">{message}</p>}
      </div>
      <Link to="/" className="text-link mt-3">
        返回登入
      </Link>
    </div>
  );
}

export default Register;
