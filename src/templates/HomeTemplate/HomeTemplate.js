import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";


export default function HomeTemplate() {
  return (
    <div
      style={{
        backgroundImage: "url('/bg-banner-shapes.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // ✅ Background cố định khi cuộn
        minHeight: "100vh"
      }}
    >
      <div style={{  minHeight: '100vh' }}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}