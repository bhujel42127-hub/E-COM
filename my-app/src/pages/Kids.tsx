import {
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Col, Input, Layout, Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/UserPageLayout/homepage/ProductCard";

export const Kids = () => {
  return (
      <div style={{ flex: 1 }}>
        <div
          className="container"
          style={{
            margin: "0 auto",
            padding: "0 50px",
            overflowX: "auto",
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <h3
            style={{
              color: "#000000",
              display: "inline-block",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            Shoes
          </h3>
          <ProductCard />
        </div>
        <div
          className="container"
          style={{
            margin: "0 auto",
            padding: "0 50px",
            overflowX: "auto",
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <h3
            style={{
              color: "#000000",
              display: "inline-block",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            T-shirt
          </h3>
          <ProductCard />
        </div>
        <div
          className="container"
          style={{
            margin: "0 auto",
            padding: "0 50px",
            overflowX: "auto",
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <h3
            style={{
              color: "#000000",
              display: "inline-block",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            Kattu
          </h3>
          <ProductCard />
        </div>
      </div>
  );
};
