import { Layout, Menu, Input, Badge } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { ProductCard } from "./homepage/ProductCard";
import { Deals } from "./homepage/Deals";
import { FooterContent } from "./homepage/FooterContent";
import { Trending } from "./homepage/Trending";
import { AutoPlaySlider } from "../Swiper/AutoPlaySlider";
import { Link } from "react-router-dom";

export const UserDashboardLayout = () => {
  const headerItems = [
    {
      key: "1",
      label: <Link to="/men">Men</Link>,
    },
    {
      key: "2",
      label: <Link to="/women">Women</Link>,
    },
    {
      key: "3",
      label: <Link to="/kids">Kids</Link>,
    },
    {
      key: "4",
      label: <Link to="/shop">Shop</Link>,
    },
    {
      key: "5",
      label: <Link to="/contactUs">Contact Us</Link>,
    },
  ];

  return (
    <Layout
      className="min-h-screen bg-white"
      style={{ fontFamily: "Libre Baskerville", width: "100vw" }}
    >
      {/* header */}
      {/*  */}
      {/*  */}
      <Header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          width: "100%",
          padding: 0,
          height: "70px",
          lineHeight: "70px",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            margin: "0 auto",
            padding: "0 50px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}
            >
              <img alt="logo" style={{ height: "40px" }} />
            </div>
            <Menu
              mode="horizontal"
              items={headerItems}
              defaultSelectedKeys={["1"]}
              style={{ border: "none", lineHeight: "70px" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Input
              placeholder="Search here"
              prefix={<SearchOutlined />}
              style={{ width: "300px", borderRadius: "20px" }}
            />
            <HeartOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            <Badge count={0} showZero>
              <ShoppingCartOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </Badge>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserOutlined />
              </div>
              <span>Anne Doe</span>
            </div>
          </div>
        </div>
      </Header>
      {/* invite friends span */}
      {/*  */}
      {/*  */}
      <div
        style={{
          backgroundColor: "#f0f0ff",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        <div
          className="container"
          style={{ margin: "0 auto", padding: "0 50px", position: "relative" }}
        >
          <span>Invite Friends and get 50% off on your next purchase </span>
          <a href="#" style={{ color: "#1890ff", marginLeft: "10px" }}>
            Invite Now
          </a>
          <CloseOutlined
            style={{
              position: "absolute",
              right: "50px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div className="flex w-full">
        <AutoPlaySlider />
      </div>
      {/* trending now  */}
      {/*  */}
      {/*  */}
      <div className="w-full" style={{ padding: "50px 0" }}>
        <div
          className="container"
          style={{
            margin: "0 auto",
            padding: "0 50px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Trending Now
          </h2>
          <ProductCard />
        </div>
      </div>
      {/* deals of the day */}
      {/*  */}
      {/*  */}
      <div
        className="w-full"
        style={{ padding: "50px 0", backgroundColor: "#f5f5f5" }}
      >
        <Deals />
      </div>
      {/* trending offers */}
      {/*  */}
      {/*  */}
      <div className="w-full" style={{ padding: "50px 0" }}>
        <Trending />
      </div>
      {/* footer */}
      {/*  */}
      {/*  */}
      <footer
        style={{
          backgroundColor: "#0a0e27",
          color: "#ffffff",
          padding: "60px 0 30px",
        }}
      >
        <div
          className="container"
          style={{ margin: "0 auto", padding: "0 50px" }}
        >
          <FooterContent />
        </div>
      </footer>
    </Layout>
  );
};
