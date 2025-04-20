
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FeaturesSection from "../components/FeaturesSection";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, phone });
  };

  const features = [
    {
      icon: "fa-bolt",
      title: "Quản lý nhanh chóng",
      description: "Giúp quản lý ký túc xá hiệu quả, tiết kiệm thời gian",
    },
    {
      icon: "fa-user-friends",
      title: "Dễ sử dụng",
      description: "Giao diện thân thiện, ai cũng có thể sử dụng dễ dàng",
    },
    {
      icon: "fa-file-contract",
      title: "Hợp đồng điện tử",
      description: "Quản lý hợp đồng, hóa đơn, thông tin sinh viên",
    },
    {
      icon: "fa-chart-line",
      title: "Thống kê chi tiết",
      description: "Thống kê thu nhập, chi phí, công nợ tự động",
    },
  ];

  const banks = [
    { name: "Vietcombank", logo: "https://logo.clearbit.com/vietcombank.com.vn" },
    { name: "Techcombank", logo: "https://logo.clearbit.com/techcombank.com.vn" },
    { name: "Vietinbank", logo: "https://logo.clearbit.com/vietinbank.vn" },
    { name: "ACB", logo: "https://logo.clearbit.com/acb.com.vn" },
    { name: "Agribank", logo: "https://logo.clearbit.com/agribank.com.vn" },
    { name: "BIDV", logo: "https://logo.clearbit.com/bidv.com.vn" },
  ];

  return (
    <div data-aos="fade-up">
      <section
        className="bg-light bg-im text-dark py-5"
        style={{
          backgroundImage: "url('https://quanlytro.me/images/backgrounds/bg-banner.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4 fs-1 fw-bold mb-4">
                <span className="text-success">Phần mềm quản lý ký túc xá</span><br /> Điện thoại - iPad - Máy tính 🎉
              </h1>
              <p className="fs-4 mb-4">
                Hiệu quả - Chuyên nghiệp - Tránh sai sót... Quản lý chưa bao giờ dễ dàng hơn thế!
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <a href="#" className="btn btn1 btn-primary btn-lg">
                  Giới thiệu phần mềm
                </a>
                <a href="#" className="btn btn1 btn-outline-dark btn-media btn-lg rounded-pill">
                  Tư vấn dịch vụ
                </a>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="https://quanlytro.me/images/banner-home.webp"
                alt="App Dormido"
                className="img-fluid rounded shadow"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>



      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">


            <div id="bankCarousel" className="carousel slide" data-bs-ride="carousel">
              {/* Carousel indicators */}
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#bankCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#bankCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              </div>
              <div className="text-center mb-4">
                <h1 className="fw-bold text-dark mb-2">Hỗ trợ thanh toán qua nhiều ngân hàng</h1>
                <p className="text-success mb-4">Miễn phí giao dịch</p>
              </div>
              {/* Carousel slides */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row row-cols-3 g-3">
                    {banks.slice(0, 3).map((bank, index) => (
                      <div className="col" key={index}>
                        <div className="card shadow-sm d-flex align-items-center justify-content-center p-3">
                          <img
                            src={bank.logo}
                            alt={`${bank.name} logo`}
                            className="img-fluid"
                            style={{ height: "150px" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row row-cols-3 g-3">
                    {banks.slice(3, 6).map((bank, index) => (
                      <div className="col" key={index + 3}>
                        <div className="card shadow-sm d-flex align-items-center justify-content-center p-3">
                          <img
                            src={bank.logo}
                            alt={`${bank.name} logo`}
                            className="img-fluid"
                            style={{ height: "150px" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel controls */}
              <button className="carousel-control-prev" type="button" data-bs-target="#bankCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#bankCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

      </section>
      <section>
        <FeaturesSection />
      </section>


      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0 order-md-1">
              <img
                src="https://quanlytro.me/images/icons/button_media.svg"
                alt="Multi platform"
                className="img-fluid"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="col-md-6 order-md-2">
              <h2 className="display-5 fw-bold mb-4">Quản lý trên đa nền tảng</h2>
              <p className="fs-5 mb-4">Điện thoại - iPad - Máy tính - Website</p>
              <p className="text-muted mb-4">
                Quản lý trên tất cả các thiết bị, mọi lúc mọi nơi. Dù bạn đang ở đâu chỉ cần có kết
                nối internet là bạn có thể quản lý ký túc xá của mình. Mọi dữ liệu được đồng bộ trên
                tất cả các thiết bị.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="btn btn-dark d-flex align-items-center">
                  <i className="fab fa-apple me-2 fs-5"></i> App Store
                </a>
                <a href="#" className="btn btn-dark d-flex align-items-center">
                  <i className="fab fa-google-play me-2 fs-5"></i> Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-dark" data-aos="fade-up">
        <div className="container py-5 text-center">
          <h2 className="display-5 fw-bold mb-4">Đăng ký trải nghiệm miễn phí</h2>
          <p className="fs-4 mb-5">
            Nhận tư vấn và trải nghiệm miễn phí phần mềm quản lý ký túc xá
          </p>

          <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
            <div className="card-body p-4">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="form-control form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="form-control form-control-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSubmit}
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}