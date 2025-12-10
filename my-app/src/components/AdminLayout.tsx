import { useState } from "react";
import { Button, Layout, Menu, Drawer } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { axiosInstance } from "../api/axiosInstance";
import { queryClient } from "../lib/queryClient";

const { Header, Content, Sider } = Layout;

export const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      key: "2",
      label: "Products",
      onClick: () => {
        navigate("/admin/products");
      },
    },
  ];

  const handleLogout = async () => {
    console.log("Logout button clicked!!");
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("handle logout try catch");
      await axiosInstance.post("/auth/logout", {
        token: refreshToken,
      });
      console.log("After logout post");
      queryClient.clear();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#001529",
        }}
      >
        <div
          style={{
            height: "72px",
            margin: "16px 36px 16px 36px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        ></div>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 0 : 200,
          transition: "margin-left 0.2s",
        }}
        className="main-layout"
      >
        <Header
          style={{
            padding: "0  16px",
            background: "#fff",
            margin: "10px 16px 0 16px",
            alignItems: "center",
            borderRadius: "8px",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ flex: 1 }} />

          <Button onClick={handleLogout} danger>
            Logout
          </Button>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#ffffff",
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
