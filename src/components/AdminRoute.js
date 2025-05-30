import React from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  // Kiểm tra nếu không có token (chưa đăng nhập)
  if (!token) {
    message.error('Vui lòng đăng nhập để tiếp tục');
    return <Navigate to="/login" replace />;
  }
  
  // Kiểm tra nếu là sinh viên
  if (role === 'student') {
    message.error('Bạn không có quyền truy cập trang quản lý');
    return <Navigate to="/" replace />;
  }
  
  // Nếu đã đăng nhập và không phải là sinh viên
  return children;
};

export default AdminRoute;