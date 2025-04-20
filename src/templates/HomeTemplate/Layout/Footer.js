
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <div data-aos="fade-up"
      className="" 
      style={{ 
        padding: '80px',
        minHeight: '70vh',
        backgroundColor: 'rgb(247,250,252)',
        backgroundImage: `url('https://quanlytro.me/images/backgrounds/network.webp')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="container py-8">
      

        {/* Main Content */}
        <div 
          className="mb-12 p-4" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 1)',
            backgroundImage: `url('https://quanlytro.me/images/backgrounds/container-footer.webp')`, 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom', 
            borderRadius: '10px' 
          }}
        >
          {/* Row 1: 3 Columns (Left, Middle, Right) */}
          <div className="row">
            {/* Left Column */}
            <div className="col-md-4">
              <div className="col-md-6 mb-6 mb-md-0">
                <h1 className="h3 font-weight-bold text-dark">LOZIDO</h1>
                <p className="h6 text-secondary">Quản lý NHÀ CHO THUÊ</p>
              </div>
              <p className="text-muted">Phần mềm quản lý nhà cho thuê chuyên nghiệp với nhiều tính năng hỗ trợ chủ nhà và người thuê.</p>
              <div className="d-flex align-items-center">
              
              </div>
            </div>

            {/* Middle Column */}
            <div className="col-md-4">
              <div className="row">
                <div className="col-6">
                  <h3 className="font-weight-bold text-dark mb-3">Về chúng tôi</h3>
                  <ul className="list-unstyled text-muted">
                    <li><a href="#" className="text-decoration-none text-dark">Giới thiệu</a></li>
                    <li><a href="#" className="text-decoration-none text-dark">Tính năng</a></li>
                    <li><a href="#" className="text-decoration-none text-dark">Bảng giá</a></li>
                  </ul>
                </div>
                <div className="col-6">
                  <h3 className="font-weight-bold text-dark mb-3">Hỗ trợ</h3>
                  <ul className="list-unstyled text-muted">
                    <li><a href="#" className="text-decoration-none text-dark">Hướng dẫn</a></li>
                    <li><a href="#" className="text-decoration-none text-dark">Câu hỏi</a></li>
                    <li><a href="#" className="text-decoration-none text-dark">Liên hệ</a></li>
                  </ul>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-weight-bold text-dark">Tải ứng dụng</h3>
                <div className="d-flex flex-column">
                  <a href="#" className="btn btn-dark mr-2 d-flex align-items-center mb-2"  style={{ width: '150px', justifyContent: 'center' }}>
                    <i className="fab fa-apple mr-2"></i>
                    <span>App Store</span>
                  </a>
                  <a href="#" className="btn btn-dark d-flex align-items-center"  style={{ width: '150px', justifyContent: 'center' }}>
                    <i className="fab fa-google-play mr-2"></i>
                    <span>Google Play</span>
                  </a>
                </div>
              
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-4">
              <h3 className="font-weight-bold text-dark">Liên hệ</h3>
              <div className="text-muted">
                <p><i className="fas fa-phone-alt mr-2 text-dark"></i> 0123 456 789</p>
                <p><i className="fas fa-envelope mr-2 text-dark"></i> <a href="mailto:example@domain.com" className="text-decoration-none  text-dark">example@domain.com</a></p>
                <p><i className="fas fa-clock mr-2 text-dark"></i> 8:00 - 17:00 (Thứ 2 - Thứ 6)</p>
                <p><i className="fas fa-map-marker-alt mr-2 text-dark"></i> 123 Đường ABC, Quận 1, TP.HCM</p>
              </div>
            </div>
          </div>

          {/* Row 2: Social Media Links */}
          <div className="row mt-4">
            <div className="col-12">
              <h3 className="font-weight-bold text-dark mb-3 text-center">Kết nối cộng đồng</h3>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a 
                  href="#" 
                  className="btn btn-outline-primary d-flex align-items-center" 
                  style={{ width: '120px', justifyContent: 'center' }}
                >
                  <i className="fab fa-zalo mr-2"></i>
                  <span className=" fw-bolder">Zalo</span>
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-primary d-flex align-items-center" 
                  style={{ width: '120px', justifyContent: 'center' }}
                >
                  <i className="fab fa-facebook-f mr-2"></i>
                  <span className="ms-2 fw-bolder">Facebook</span>
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-danger d-flex align-items-center" 
                  style={{ width: '120px', justifyContent: 'center' }}
                >
                  <i className="fab fa-youtube mr-2"></i>
                  <span className="ms-2 fw-bolder">YouTube</span>
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-dark d-flex align-items-center" 
                  style={{ width: '120px', justifyContent: 'center' }}
                >
                  <i className="fab fa-tiktok mr-2"></i>
                  <span className="ms-2 fw-bolder" >TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-top pt-4 mt-8 mb-8">
          <div className="d-flex justify-content-between align-items-center flex-column ">
            {/* Company Info (Centered) */}
            <div className="text-center text-muted mb-2 mb-md-0">
              <p className="mb-0 fw-bold">COPYRIGHT © LOZIDO - Quản lý nhà cho thuê</p>
              <p className="mb-0">CÔNG TY TNHH PHÁT TRIỂN POPULIS</p>
            </div>

            {/* Business Registration Info (Right) */}
            <div className="text-muted text-md-right">
              <p className="mb-0">
                Đăng ký kinh doanh số 46 0318727823 - Do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp đầu ngày 19 tháng 01 năm 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}