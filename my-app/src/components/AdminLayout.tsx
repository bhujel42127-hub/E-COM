import { Button, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { axiosInstance } from "../api/axiosInstance";
// import { api } from "./utlis/api";

const { Header, Content } = Layout;

export const AdminLayout = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <HomeOutlined />,
      onClick: () => navigate("/admin"),
    },
    {
      key: "2",
      label: "View Admins",
      onClick: () => navigate("/admin/admins"),
    },
    {
      key: "3",
      label: "Products",
      onClick: () => navigate("/admin/products"),
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  return (
    <div>
      <Layout
        style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
      >
        <Sider
          width={150}
          style={{
            background: "#001529",
          }}
        >
          <Menu
            theme="dark"
            mode="vertical"
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
            }}
          />
        </Sider>

        <Layout
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <Header
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#ffffff",
                padding: "0 24px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: 0,
                zIndex: 100,
              }}
            >
              <div className="demo-logo" />

              <Button onClick={() => handleLogout()} danger>
                Logout
              </Button>
            </Header>
          </div>
          <Layout>
            <Content
              style={{
                padding: "24px",
                background: "#f0f2f5 ",
              }}
            >
              <div
                style={{
                  height: "100%",
                  padding: "24px",
                  margin: "10px",
                  borderRadius: "14px",
                  background: "#e3e3e8ff ",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
