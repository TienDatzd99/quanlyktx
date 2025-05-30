import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Kiểm tra token từ localStorage

  // Nếu không có token, chuyển hướng về trang đăng nhập (giả định là '/login')
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép truy cập vào component con
  return children;
};

export default ProtectedRoute;