// SuperAdminLayout.tsx
import {
  AppstoreOutlined,
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const { Header, Sider } = Layout;

export const SuperAdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
        }}
        className="overflow-auto h-screen fixed left-0 top-0 bottom-0 bg-[#001529]"
      >
        <div className="h-[72px] m-[16px_36px] bg-[rgba(255,255,255,0.2)] rounded-md flex items-center justify-center text-white font-bold"></div>
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
        className="transition-all duration-200"
      >
        <Header className="px-4 bg-white mt-2.5 mx-4 flex items-center rounded-lg justify-between shadow-sm sticky top-0 z-50">
          <div className="flex-1" />

          <Button onClick={handleLogout} danger icon={<LogoutOutlined />}>
            Logout
          </Button>
        </Header>

        <Outlet />
      </Layout>
    </Layout>
  );
};
