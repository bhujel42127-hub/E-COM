import { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { axiosInstance } from "../api/axiosInstance";
import { queryClient } from "../lib/queryClient";
import { useAuth } from "../hooks/useAuth";

const { Header, Content, Sider } = Layout;

export const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useAuth();

  const items = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin"),
    },
    {
      key: "3",
      icon: <ProductOutlined />,
      label: "Products",
      onClick: () => navigate("/admin/products"),
    },
  ];

  if (role === "SUPER_ADMIN") {
    items.splice(1, 0, {
      key: "2",
      icon: <UserOutlined />,
      label: "Admins",
      onClick: () => navigate("/admin/admins"),
    });
  }

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
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        className="overflow-auto h-screen fixed left-0 top-0 bottom-0 bg-[#001529]"
      >
        <div className="h-[72px] m-[16px_36px] bg-[rgba(255,255,255,0.2)] rounded-md flex items-center justify-center text-white font-bold" />
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={items}
          className="border-r-0"
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 0 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header className="px-4 bg-white mt-2.5 mx-4 flex items-center rounded-lg justify-between shadow-sm sticky top-0 z-50">
          <div className="flex-1" />
          <Button onClick={handleLogout} danger icon={<LogoutOutlined />}>
            Logout
          </Button>
        </Header>

        <Content className="m-6 p-6 min-h-[280px] bg-white rounded-lg overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
