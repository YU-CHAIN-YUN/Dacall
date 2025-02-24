import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' //Axios 來發 API 請求
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // 確保 Bootstrap 的 JS 有載入
import '@fortawesome/fontawesome-free/css/all.min.css'; // 顯示圖標

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)