import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../../redux/slices/manageSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Lấy thông tin người dùng từ state
  const { userLogin } = useSelector(state => state.auth || {});
  
  // Kiểm tra token và fetch thông tin người dùng khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Xác định trạng thái đăng nhập dựa trên sự tồn tại của token
    setIsAuthenticated(!!token);
    
    // Nếu có token nhưng chưa có thông tin người dùng, thì fetch thông tin
    if (token && !userLogin) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, userLogin]);
  
  // Lấy chữ cái đầu tiên của tên người dùng để làm avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };
  
  // Hàm đăng xuất
  const handleLogout = () => {
    // Xóa token từ localStorage
    localStorage.removeItem('token');
    // Cập nhật trạng thái xác thực
    setIsAuthenticated(false);
    // Reset state user (nếu bạn có action logout)
    // dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img
                src="/Logo_PTIT_University.png"
                alt="PTIT Ký Túc Xá"
                style={{ width: "40px", height: "40px" }}
              />
              <span className="ms-2 fs-4 fw-bold text-danger">PTIT Ký Túc Xá</span>
            </Link>
          </div>

          <nav className="d-none d-md-flex align-items-center gap-3">
            <Link to="/" className="text-dark text-decoration-none">
              Trang chủ
            </Link>
            <Link to="#" className="text-dark text-decoration-none">
              Phần mềm quản lý
            </Link>
            <Link to="#" className="text-dark text-decoration-none">
              APP sinh viên
            </Link>
            <Link to="#" className="text-dark text-decoration-none">
              Lợi ích
            </Link>
            <div className="dropdown">
              <button
                className="btn text-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Dịch vụ
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    Bán phòng ký túc xá
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Thiết bị quản lý
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Marketing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn text-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Thêm
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    Cổng thông tin
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Hướng dẫn
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="d-flex align-items-center gap-3">
            <a href="tel:0123456789" className="btn btn-primary">
              <i className="fas fa-phone-alt me-2"></i>0123.456.789
            </a>
            
            {/* Hiển thị nút đăng nhập/đăng ký hoặc thông tin người dùng */}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-dark text-decoration-none">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Đăng ký
                </Link>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <span className="text-dark">{userLogin?.name || "Sinh viên"}</span>
                <div className="dropdown">
                  <div 
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                    style={{ width: "40px", height: "40px", cursor: "pointer" }}
                    data-bs-toggle="dropdown"
                  >
                    {getInitials(userLogin?.name)}
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Thông tin cá nhân
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/change-password">
                        Đổi mật khẩu
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}