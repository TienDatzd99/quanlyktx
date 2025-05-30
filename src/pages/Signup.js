import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // Mặc định là student
    room_id: "", // Thêm trường room_id (có thể để trống)
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("Dữ liệu trước khi gửi:", formData); // Log dữ liệu trước khi gửi
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    console.log("Dữ liệu gửi đi:", formData); // Log dữ liệu
    try {
      const response = await apiService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        room_id: formData.room_id || null, // Gửi null nếu không chọn room_id
      });
      console.log("Phản hồi từ server:", response); // Log phản hồi
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      console.error("Lỗi từ API:", err.response ? err.response.data : err); // Log lỗi chi tiết
      setError(err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/bg-banner-shapes.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div className="signup-container">
        <h2>Đăng Ký</h2>
        {error && <p className="error">{error}</p>}
        <div className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="student">Sinh viên</option>
            <option value="admin">Quản trị viên</option>
          </select>
          <input
            type="text"
            name="room_id"
            placeholder="Room ID (tùy chọn)"
            value={formData.room_id}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Đăng Ký</button>
        </div>
        <p>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;