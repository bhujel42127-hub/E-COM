import { Layout, Menu, Row, Col, Input, Badge, Card } from "antd";
import { Header } from "antd/es/layout/layout";
import { AutoPlaySlider } from "./Swiper/AutoPlaySlider";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ProductCard } from "./UserPageLayout/homepage/ProductCard";

export const UserDashboardLayout = () => {
  const headerItems = [
    {
      key: "1",
      label: <Link to="/men">Men</Link>
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
      {/* Header */}
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
          {/* Logo and Menu */}
          <div style={{ display: "flex", gap: "40px" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}
            >
              <img alt="logo" style={{ height: "40px" }} />
            </div>
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
              <span>Anne Doe</span>
            </div>
          </div>
        </div>
      </Header>
      {/* Promotional Banner */}
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
      {/* Slider */}
      <div className="flex w-full">
        <AutoPlaySlider />
      </div>

      {/* Trending Now Section */}
      <div className="w-full" style={{ padding: "50px 0" }}>
        <div
          className="container"
          style={{ margin: "0 auto", padding: "0 50px", overflowX: "auto", scrollbarWidth:"none" }}
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
      {/* Deals of the Day Section */}
<div className="w-full" style={{ padding: "50px 0", backgroundColor: "#f5f5f5" }}>
  <div className="container" style={{ margin: "0 auto", padding: "0 50px" }}>
    <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>
      Deals of the Day
    </h2>
    <div
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Row gutter={[20, 20]} wrap={false} style={{ paddingBottom: "10px" }}>
        {[
          {
            id: 1,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
            title: "Best of Styles",
            subtitle: "Under Rs.799",
          },
          {
            id: 2,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
            title: "Best of Styles",
            subtitle: "Under Rs.799",
          },
          {
            id: 3,
            image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
            title: "Best of Styles",
            subtitle: "Under Rs.799",
          },
          {
            id: 4,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
            title: "Best of Styles",
            subtitle: "Under Rs.799",
          },
        ].map((deal) => (
          <Col key={deal.id} flex="0 0 300px">
            <Card
              hoverable
              cover={
                <img
                  alt={deal.title}
                  src={deal.image}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              }
            >
              <img
                src={deal.logo}
                alt="Brand"
                style={{ height: "40px", marginBottom: "15px" }}
              />
              <h3 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "8px" }}>
                {deal.title}
              </h3>
              <p style={{ color: "#666", fontSize: "16px" }}>{deal.subtitle}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>
</div>

{/* Trending Offers Section */}
<div className="w-full" style={{ padding: "50px 0" }}>
  <div className="container" style={{ margin: "0 auto", padding: "0 50px" }}>
    <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>
      Trending Offers
    </h2>
    <Row gutter={[30, 30]}>
      {[
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&h=400&fit=crop",
          type: "image-left",
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop",
          type: "image-right",
        },
      ].map((offer, index) => (
        <Col key={offer.id} xs={24} md={12}>
          <Card
            style={{ overflow: "hidden", borderRadius: "8px" }}
          >
            <Row style={{ minHeight: "400px" }}>
              {index === 0 ? (
                <>
                  <Col span={12}>
                    <div
                      style={{
                        height: "100%",
                        backgroundImage: `url(${offer.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "40px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png"
                        alt="Brand"
                        style={{ height: "50px", marginBottom: "20px" }}
                      />
                      <h3 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
                        Min 60% off
                      </h3>
                      <button
                        style={{
                          padding: "10px 30px",
                          border: "2px solid #000",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          fontSize: "16px",
                          borderRadius: "4px",
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={12}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "40px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "48px",
                          fontWeight: "bold",
                          marginBottom: "20px",
                          letterSpacing: "2px",
                        }}
                      >
                        FOREVER 21
                      </h3>
                      <h4 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
                        Min 50% off
                      </h4>
                      <button
                        style={{
                          padding: "10px 30px",
                          border: "2px solid #000",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          fontSize: "16px",
                          borderRadius: "4px",
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        height: "100%",
                        backgroundImage: `url(${offer.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Col>
                </>
              )}
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
</div>
      {/* Footer */}
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
          {/* Logo */}
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>
              LOGO
            </h2>
          </div>

          {/* Footer Links */}
          <Row gutter={[0,0]}>
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
              <Col key={index} xs={12} sm={8} md={4} lg={4} style={{paddingRight:0, paddingLeft:0}}>
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
            <Col xs={24} sm={16} md={8} lg={4} style={{paddingRight:0, paddingLeft:0}}>
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
            <div style={{ display: "flex", gap: "30px"}}>
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
