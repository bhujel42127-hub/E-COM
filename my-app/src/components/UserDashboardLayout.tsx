import { Layout, Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { Logo } from "./Logo";
import { AutoPlaySlider } from "./AutoPlaySlider/AutoPlaySlider";
import Column from "antd/es/table/Column";

export const UserDashboardLayout = () => {
  const headerItems = [
    {
      key: "1",
      icon: "Men",
    },
    {
      key: "2",
      icon: "Women",
    },
    {
      key: "3",
      icon: "Kids",
    },
    {
      key: "4",
      icon: "Shop",
    },
    {
      key: "5",
      icon: "Contact us",
    },
  ];
  return (
    <Layout className="container ">
      <Header
        // className="flex bg-white"
        style={{
          display: "flex",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          alignItems: "center",
        }}
      >
        <div></div>
        <div className="">
          <img src="" alt="logo" />
        </div>
        <div>
          <Menu
            mode="horizontal"
            items={headerItems}
            defaultSelectedKeys={["1"]}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
      </Header>
      <span
        style={{
          height: "31px",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        YOYO
      </span>
      <div className="flex w-1920px h-80px">
        <AutoPlaySlider />
      </div>
      <div>
        <Row>
          <Column></Column>
        </Row>
      </div>
    </Layout>
  );
};
