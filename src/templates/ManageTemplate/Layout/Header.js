import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/manage">
          <img src="/logo.svg" alt="Logo" style={{ width: "8rem" }} />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/manage">Tổng Quan</Link>
          </li>
          <li>
            <Link to="/manage/students">Quản lý Sinh Viên</Link>
          </li>
          <li>
            <Link to="/manage/rooms">Quản lý Phòng</Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Đăng xuất
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;