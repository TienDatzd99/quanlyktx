
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
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
            <a href="tel:0965227453" className="btn btn-primary">
              <i className="fas fa-phone-alt me-2"></i>0123.456.789
            </a>
            <Link to="#" className="text-dark text-decoration-none">
              Đăng nhập
            </Link>
            <Link to="#" className="btn btn-primary">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}