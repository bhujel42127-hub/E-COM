import {
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Input, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { FooterContent } from "./homepage/FooterContent";
import { ProductContent } from "./productDetailsPage/ProductContent";

export const ProductDetails = () => {
  const headerItems = [
    {
      key: "1",
      label: "Men",
    },
    {
      key: "2",
      label: "Women",
    },
    {
      key: "3",
      label: "Kids",
    },
    {
      key: "4",
      label: "Shop",
    },
    {
      key: "5",
      label: "Contact us",
    },
  ];

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Libre Baskerville",
        minHeight: "100vh",
        width: "100vw",
      }}
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
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1890ff",
              }}
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
      {/* Product details content */}
      {/*  */}
      {/*  */}
      <div style={{ flex: 1, marginTop: "13px" }}>
        <ProductContent />
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
