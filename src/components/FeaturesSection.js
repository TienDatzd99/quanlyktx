import React, { useEffect } from 'react';

const FeaturesSection = () => {
  // Khởi tạo AOS khi component được render
  useEffect(() => {
    // Đảm bảo AOS đã được tải trước khi gọi AOS.init()
    if (window.AOS) {
      window.AOS.init({
        duration: 800, // Thời gian hiệu ứng (ms)
        easing: 'ease-in-out', // Kiểu hiệu ứng
        once: false, // Chỉ chạy hiệu ứng một lần
      });
    }
  }, []);
  return (
    <div >
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5" >
          <h1 className="fw-bold text-dark mb-3 h3 h-md-2" data-aos="fade-up">
            VỚI NHỮNG TÍNH NĂNG TUYỆT VỜI WEBSITE SẼ HỖ TRỢ BẠN.
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }} data-aos="fade-up">
            Nhiều tính năng căn bản và mở rộng sẽ giúp công việc thanh toán của bạn dễ dàng hơn bao giờ hết.
            Hãy tham khảo một vài chức năng cơ bản mà chúng tôi đang hỗ trợ.
          </p>
        </div>

        {/* Banner */}
        <div data-aos="fade-up"
          className="rounded-4 p-4 p-md-5 mb-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4"
          style={{
            backgroundImage: "url('https://quanlytro.me/images/gui-hoa-don-tu-dong-zalo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >

        </div>

        <div className="row g-4">
          {/* Feature Card 1 */}
          <div className="col-lg-6 "  data-aos="fade-right" >
            <div className="card h-100 shadow-sm border-0 p-4" style={{ fontSize: "1.125rem" }}>
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-bed"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Đăng ký nội trú KTX
                    </h4>
                    <p className="card-text text-secondary">
                      Sinh viên có thể đăng ký phòng ở ký túc xá tiện lợi, minh bạch và nhanh chóng.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="card h-100 shadow-sm border-0 p-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-money-bill-wave"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Thanh toán tiền phòng
                    </h4>
                    <p className="card-text text-secondary">
                      Hỗ trợ thanh toán tiền phòng dễ dàng qua nhiều phương thức khác nhau.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="card h-100 shadow-sm border-0 p-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Báo cáo tình trạng phòng 
                    </h4>
                    <p className="card-text text-secondary">
                      Tra cứu và báo cáo tình trạng phòng ở ký túc xá nhanh chóng.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Feature Card 4 */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="card h-100 shadow-sm border-0 p-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-tint"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Thanh toán tiền nước
                    </h4>
                    <p className="card-text text-secondary">
                      Quản lý chỉ số nước và thanh toán tiền nước chính xác, minh bạch.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Feature Card 5 */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="card h-100 shadow-sm border-0 p-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-wallet"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Thanh toán chi phí khác
                    </h4>
                    <p className="card-text text-secondary">
                      Hệ thống hỗ trợ thanh toán mọi loại chi phí khác liên quan đến nội trú.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Feature Card 6 */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="card h-100 shadow-sm border-0 p-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-coins"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Thanh toán tiền cọc nội trú
                    </h4>
                    <p className="card-text text-secondary">
                      Quản lý và thanh toán tiền đặt cọc nội trú rõ ràng, chính xác.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Feature Card 7 */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="card h-100 shadow-sm border-0 p-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-soap"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Đăng ký Giặt Sấy
                    </h4>
                    <p className="card-text text-secondary">
                      Học sinh, sinh viên có thể đặt lịch giặt sấy ngay trên hệ thống.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Feature Card 8 */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="card h-100 shadow-sm border-0 p-4">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div
                    className="col-auto d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#8bc34a1c",
                      fontSize: "1.5rem",
                      color: "#4CAF50",
                    }}
                  >
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: "1.5rem" }}>
                      Điểm nội trú
                    </h4>
                    <p className="card-text text-secondary">
                      Xem điểm nội trú và chấp hành nội quy dễ dàng, minh bạch.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FeaturesSection;
