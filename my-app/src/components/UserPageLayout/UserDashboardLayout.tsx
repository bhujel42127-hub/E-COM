import { Layout} from "antd";
import {
  CloseOutlined,
} from "@ant-design/icons";
import { ProductCard } from "./homepage/ProductCard";
import { Deals } from "./homepage/Deals";
import { Trending } from "./homepage/Trending";
import { AutoPlaySlider } from "../Swiper/AutoPlaySlider";

export const UserDashboardLayout = () => {
  return (
    <Layout
      className="min-h-screen bg-white"
      style={{ fontFamily: "Libre Baskerville", width: "100vw" }}
    >
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
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Trending Now
        </h2>
        <div
          className="container"
          style={{
            margin: "0 auto",
            padding: "0 50px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
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
    </Layout>
  );
};
