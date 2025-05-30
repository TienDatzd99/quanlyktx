import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./DashboardManagement.css";

// Dữ liệu mặc định đầy đủ
const defaultStats = {
  occupancy_rate: 80,
  revenue: [
    { total: 1200000 },
    { total: 1500000 },
    { total: 2300000 }
  ],
  average_rating: 4.5,
  totalStudents: 120,
  availableRooms: 5,
  reportsCount: 2
};

const DashboardManagement = () => {
  const { stats: reduxStats, loading } = useSelector((state) => state.manage);

  // Đảm bảo stats luôn có đầy đủ dữ liệu
  const stats = { ...defaultStats, ...(reduxStats || {}) };

  // Kiểm tra nếu đang tải
  if (loading) {
    return <div className="dashboard-container">Đang tải dữ liệu...</div>;
  }

  // Tính toán các giá trị một cách an toàn
  const occupancyRate = stats.occupancy_rate || 0;
  const totalRevenue = (stats.revenue || []).reduce((sum, r) => sum + (r.total || 0), 0);

  return (
    <div className="dashboard-container">
      <h2>Quản Lý Tổng Quan</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <p>Tỷ lệ lấp đầy phòng</p>
          <h3>{occupancyRate}%</h3>
          <p className="change">↑ 5% so với tháng trước</p>
        </div>
        <div className="stat-card">
          <p>Tổng doanh thu</p>
          <h3>{totalRevenue.toLocaleString()} VNĐ</h3>
          <p className="change">↑ 10% so với tháng trước</p>
        </div>
        <div className="stat-card">
          <p>Đánh giá trung bình</p>
          <h3>{stats.average_rating}/5</h3>
          <p className="change">↑ 0.5 so với tháng trước</p>
        </div>
      </div>

      <div className="data-import">
        <h3>Thông tin nhanh</h3>
        <p>Xem thông tin cơ bản về ký túc xá của bạn:</p>
        <ul>
          <li>Số lượng sinh viên: {stats.totalStudents}</li>
          <li>Số phòng trống: {stats.availableRooms}</li>
          <li>Báo cáo sự cố: {stats.reportsCount}</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardManagement;