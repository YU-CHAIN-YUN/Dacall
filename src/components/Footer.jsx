import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css";

function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Footer 區塊 */}
      <footer className="footer">
        <p onClick={() => setShowModal(true)} className="contact-link">
          聯絡我們
        </p>
      </footer>

      {/* 聯絡我們的 Modal 彈窗 */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content p-4">
            <div className="modal-header">
              <h5 className="modal-title">聯絡我們</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">姓名</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">聯絡方式</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">問題類型</label>
                  <select className="form-select">
                    <option>帳號問題</option>
                    <option>系統錯誤</option>
                    <option>其他問題</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">詳細描述</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-brown w-100">
                  <i className="fas fa-check"></i> 送出
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
