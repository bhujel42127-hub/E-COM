import { Outlet } from "react-router-dom";

import {
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Col, Input, Layout, Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { useGetUser } from "../hooks/useGet";
import { getAccessToken } from "../utlis/handleToken";

export const UserDashboard = () => {
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
  const token = getAccessToken();
  const { data } = useGetUser(token);
  const userName = "Guest";

  return (
    <Layout
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Libre Baskerville",
        // minWidth: "100vw",
        width: "100%",
      }}
    >
      {/* Header */}
      <Header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          width: "100%",
          padding: 0,
          height: "70px",
          lineHeight: "70px",
          marginBottom: "10px",
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
          {/* Logo and Menu */}
          <div style={{ display: "flex", gap: "40px" }}>
            <Link to="/home" replace>
              <img
                alt="logo"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1890ff",
                  height: "40px",
                }}
              />
            </Link>
            <Menu
              mode="horizontal"
              items={headerItems}
              style={{ border: "none", lineHeight: "70px" }}
            />
          </div>

          {/* Search and Icons */}
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
              <span>{userName}</span>
            </div>
          </div>
        </div>
      </Header>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      {/* Footer */}
      <footer
        style={{
          marginTop: "45px",
          backgroundColor: "#0a0e27",
          color: "#ffffff",
          padding: "60px 0 30px",
        }}
      >
        <div style={{ margin: "0 auto", padding: "0 50px" }}>
          {/* Logo */}
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>
              LOGO
            </h2>
          </div>

          {/* Footer Links */}
          <Row gutter={[0, 0]}>
            {[
              {
                title: "Women",
                links: ["All Women", "Skirts", "T- Shirts", "Tops", "Jackets"],
              },
              {
                title: "Men",
                links: ["All Men", "Shirts", "T- Shirts", "Shorts", "Jackets"],
              },
              {
                title: "Kids",
                links: ["All Kids", "Shirts", "T- Shirts", "Shorts", "Jackets"],
              },
              {
                title: "Shopping",
                links: [
                  "Your cart",
                  "your orders",
                  "Compared items",
                  "Wishlist",
                  "Shipping Details",
                ],
              },
              {
                title: "More links",
                links: [
                  "Blogs",
                  "Gift center",
                  "Buying guides",
                  "New arrivals",
                  "Clearance",
                ],
              },
            ].map((column, index) => (
              <Col
                key={index}
                xs={12}
                sm={8}
                md={4}
                lg={4}
                style={{ paddingRight: 0, paddingLeft: 0 }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  {column.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {column.links.map((link, i) => (
                    <li key={i} style={{ marginBottom: "8px" }}>
                      <a
                        href="#"
                        style={{
                          color: "#ffffff",
                          textDecoration: "none",
                          opacity: 0.8,
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}

            {/* Stay In Touch */}
            <Col
              xs={24}
              sm={16}
              md={8}
              lg={4}
              style={{ paddingRight: 0, paddingLeft: 0 }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                Stay In Touch
              </h3>
              <p
                style={{
                  opacity: 0.8,
                  marginBottom: "20px",
                  lineHeight: "1.6",
                }}
              >
                Stay in touch to get special offers, free giveaways and once in
                a lifetime deals
              </p>
              <Input
                placeholder="Enter your email"
                prefix={<span>✉</span>}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#ffffff",
                  padding: "10px 15px",
                  borderRadius: "4px",
                }}
              />
            </Col>
          </Row>

          {/* Bottom Footer */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              marginTop: "50px",
              paddingTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "30px" }}>
              {["Terms & Conditions", "Privacy Policy"].map((text, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    color: "#ffffff",
                    opacity: 0.8,
                  }}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};
