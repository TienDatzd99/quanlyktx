import React from "react";

const Testimonials = () => {
    return (
        <>
            {/* Testimonials Section */}
            <section className="py-5 position-relative bg-white " >
               
                <div className="container pt-5"  >
                    <div className="text-center mb-5 "data-aos="fade-down" >
                        <h2 className="fw-bold mb-3 text-success" >
                            CẢM NHẬN CỦA SINH VIÊN PTIT <br /> VỀ KÝ TÚC XÁ
                        </h2>
                        <p className="lead mx-auto" style={{ maxWidth: "720px" }}>
                            Ký túc xá là nơi không chỉ để ở mà còn là nơi lưu giữ những kỷ niệm thanh xuân đáng nhớ của sinh viên PTIT. Hãy cùng lắng nghe những chia sẻ chân thật từ các bạn sinh viên đã và đang sống tại đây.
                        </p>
                    </div>

                    <div className="row g-5 justify-content-around">
                        {[
                            {
                                img: "https://randomuser.me/api/portraits/men/11.jpg",
                                quote: "KTX gần trường, tiện lợi cho việc học và đi lại. Không gian yên tĩnh, bạn bè vui vẻ, đúng chất sinh viên.",
                                name: "Nguyễn Văn An",
                                info: "Sinh viên năm 2, Viễn thông",
                            },
                            {
                                img: "https://randomuser.me/api/portraits/women/52.jpg",
                                quote: "Phòng sạch sẽ, an ninh tốt. Mỗi lần về quê đều nhớ cảm giác quay lại KTX như về nhà thứ hai.",
                                name: "Trần Thị Mai",
                                info: "Sinh viên năm 3, Công nghệ thông tin",
                            },
                            {
                                img: "https://randomuser.me/api/portraits/men/45.jpg",
                                quote: "Ký túc xá có căng tin tiện lợi, chỗ để xe rộng rãi. Cuối tuần cùng bạn bè nấu ăn chung rất vui.",
                                name: "Lê Minh Huy",
                                info: "Sinh viên năm 1, An toàn thông tin",
                            },
                            {
                                img: "https://randomuser.me/api/portraits/women/47.jpg",
                                quote: "Mình từng lo lắng khi vào đại học xa nhà, nhưng KTX PTIT giúp mình an tâm vì có môi trường học tập và sinh hoạt tốt.",
                                name: "Phạm Hồng Ngọc",
                                info: "Sinh viên năm cuối, Kỹ thuật điện tử",
                            },
                        ].map((testimonial, idx) => (
                            <div className="col-12 col-md-6 col-lg-2 mb-4 testimonial  ms-2" key={idx} style={{ minWidth: "300px", }} data-aos="fade-up" >
                                <div className="  h-100 text-center " style={{ minHeight: "370px", }}>
                                    <div>
                                        <img
                                            src={testimonial.img}
                                            alt="Sinh viên PTIT"
                                            className="rounded-circle mb-3"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                        <div className="text-warning mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className="fas fa-star"></i>
                                            ))}
                                        </div>
                                        <p className="text-muted mb-3">"{testimonial.quote}"</p>
                                        <h5 className="fw-bold text-primary mb-0">{testimonial.name}</h5>
                                        <small className="text-secondary">{testimonial.info}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5 " data-aos="fade-down">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5 text-success" >Điểm nổi bật của Ký túc xá PTIT</h2>
                    <div className="row">
                        {[
                            {
                                icon: "fas fa-shield-alt",
                                title: "An ninh đảm bảo 24/7",
                                desc: "Có bảo vệ trực ca và camera giám sát, đảm bảo an toàn tuyệt đối cho sinh viên.",
                            },
                            {
                                icon: "fas fa-wifi",
                                title: "Wifi tốc độ cao",
                                desc: "Phủ sóng toàn bộ khu vực KTX, hỗ trợ tốt cho việc học online và giải trí.",
                            },
                            {
                                icon: "fas fa-utensils",
                                title: "Căng tin tiện lợi",
                                desc: "Phục vụ đa dạng món ăn với giá sinh viên, sạch sẽ và ngon miệng.",
                            },
                        ].map((feature, idx) => (
                            <div className="col-12 col-md-4 mb-4" key={idx}>
                                <div className="bg-white p-4 rounded shadow-sm h-100 text-center">
                                    <div className="text-primary mb-3">
                                        <i className={`${feature.icon} fa-2x`}></i>
                                    </div>
                                    <h5 className="fw-bold mb-2">{feature.title}</h5>
                                    <p className="text-muted">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
