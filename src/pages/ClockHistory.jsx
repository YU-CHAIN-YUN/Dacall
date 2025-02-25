import React, { useState, useEffect } from "react";  // 🔹 修正：引入 React
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./ClockHistory.css";

function ClockHistory() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [year, setYear] = useState(currentYear.toString());
  const [month, setMonth] = useState(currentMonth.toString());
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [records, setRecords] = useState({});
  const [employees, setEmployees] = useState([]);

  // **獲取部門清單**
  useEffect(() => {
    setTimeout(() => {
      setDepartments(["人力資源部", "資訊部", "業務部", "財務部", "客服部"]);
    }, 500);
  }, []);

  // **計算該月份有幾天**
  useEffect(() => {
    const days = new Date(year, month, 0).getDate();
    setDaysInMonth(days);
  }, [year, month]);

  // **模擬後端傳回來的打卡數據**
  useEffect(() => {
    setRecords({
      "1001": { name: "王小明", 1: { clockIn: "08:30", clockOut: "18:00" }, 3: { clockIn: "09:00", clockOut: "18:30" } },
      "1002": { name: "李大華", 7: { clockIn: "08:45", clockOut: "17:50" }, 15: { clockIn: "09:10", clockOut: "18:15" } },
      "1003": { name: "張美玲", 5: { clockIn: "08:50", clockOut: "18:10" } },
    });
  }, []);

  // **根據員工編號篩選員工**
  useEffect(() => {
    if (employeeId) {
      if (records[employeeId]) {
        setEmployees([{ id: employeeId, name: records[employeeId].name }]);
      } else {
        setEmployees([]);
      }
    } else {
      setEmployees(
        Object.keys(records).map((id) => ({
          id,
          name: records[id].name,
        }))
      );
    }
  }, [employeeId, records]);

  const handleSearch = () => {
    console.log({ department, employeeId, year, month });
  };

  return (
    <div className="container clock-history-page">
      <h2 className="text-center page-title">查詢打卡紀錄</h2>

      {/* 🔹 搜尋區塊 */}
      <div className="search-container">
        <div className="row w-100">
          <div className="col-md-3 search-box">
            <label>選擇部門：</label>
            <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">請選擇</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 search-box">
            <label>員工編號：</label>
            <input type="text" className="form-control" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="輸入員工編號" />
          </div>

          <div className="col-md-3 search-box">
            <label>選擇年份：</label>
            <div className="input-group">
              <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
                {[...Array(10)].map((_, index) => {
                  const yearValue = currentYear - index;
                  return (
                    <option key={yearValue} value={yearValue}>
                      {yearValue}
                    </option>
                  );
                })}
              </select>
              <span className="input-group-text">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>

          <div className="col-md-3 search-box">
            <label>選擇月份：</label>
            <div className="input-group">
              <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                {[...Array(12)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} 月
                  </option>
                ))}
              </select>
              <span className="input-group-text">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>

          <div className="col-md-12 d-flex justify-content-center mt-3">
            <button className="btn btn-brown" onClick={handleSearch}>
              <i className="fas fa-search"></i> 查詢
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 打卡紀錄表格 */}
      <h4 className="text-center fw-bold">{year} 年 {month} 月</h4>
      <div className="record-container">
        <div className="table-responsive">
          <table className="table record-table">
            <thead>
              <tr>
                <th>姓名</th>
                {[...Array(daysInMonth)].map((_, index) => (
                  <th key={`day-${index}`} colSpan="2">{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="align-middle">{emp.name}</td>
                    {[...Array(daysInMonth)].map((_, index) => (
                      <React.Fragment key={`emp-${emp.id}-day-${index}`}>
                        <td className="clock-cell">{records[emp.id]?.[index + 1]?.clockIn || "--"}</td>
                        <td className="clock-cell">{records[emp.id]?.[index + 1]?.clockOut || "--"}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={daysInMonth * 2 + 1} className="text-center text-muted">
                    {employeeId ? "查無此員工" : "請選擇查詢條件"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClockHistory;
