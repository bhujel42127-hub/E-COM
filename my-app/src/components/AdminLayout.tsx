import { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { axiosInstance } from "../api/axiosInstance";
import { queryClient } from "../lib/queryClient";

const { Sider } = Layout;

export const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin"),
    },
    {
      key: "2",
      label: "Products",
      onClick: () => navigate("/admin/products"),
    },
  ];

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axiosInstance.post("/auth/logout", { token: refreshToken });
      queryClient.clear();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (error) {
      console.log("Logout error: ", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(c) => setCollapsed(c)}
        className="overflow-auto h-screen fixed left-0 top-0 bottom-0 !bg-primary"
      >
        <div className="h-[72px] mx-9 my-4 bg-white/20 rounded-md flex items-center justify-center text-white font-bold" />
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={items}
          className="!border-r-0"
        />
      </Sider>

      <Layout
        style={{ marginLeft: collapsed ? 0 : 200, transition: "margin-left 0.2s" }}
        className="main-layout"
      >
        {/* Header */}
        <header
          className="flex items-center justify-between px-4 bg-white mx-4 mt-2.5 rounded-lg shadow-md sticky top-0 z-[100]"
          style={{ height: 64 }}
        >
          <div className="flex-1" />
          <Button onClick={handleLogout} danger>
            Logout
          </Button>
        </header>

        {/* Content */}
        <main className="m-6 p-6 min-h-[280px] bg-white rounded-lg overflow-auto">
          <Outlet />
        </main>
      </Layout>
    </Layout>
  );
};
