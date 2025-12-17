import { Card, Col, Row } from "antd";
import { useGetAllProduct } from "../../../hooks/useGet";
import type { Product } from "../../../Props";
import { useNavigate } from "react-router-dom";

export const ProductCard = () => {
  const { data, isLoading } = useGetAllProduct();
  const navigate = useNavigate();
  return (
    <Row gutter={[20, 20]} wrap={false}>
      {data?.products?.map((product: Product) => (
        <Col
          key={product._id as string}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={4.8}
          flex="0 0 280px"
        >
          <Card
            hoverable
            loading={isLoading}
            styles={{body: {padding: 10}}}
            onClick={() => navigate(`/productDetails/${product.slug}`)}
            cover={
              <img
                alt={product.name as string}
                src={product.imageUrl}
                style={{minHeight:"150px", maxHeight: "150px",objectFit: "cover" }}
              />
            }
          >
            <div>
              
            </div>
            <h3
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                fontSize: "16px",
              }}
            >
              {product.name}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>
                {product.brand}
              </span>
              <span style={{ color: "#faad14", fontSize: "14px" }}>
                Product rating here..
                {/* {product.rating} ⭐ */}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {product.price as number}
              </span>
              <span
                style={{
                  color: "#999",
                  textDecoration: "line-through",
                  fontSize: "14px",
                }}
              >
                {product.price as number}
              </span>
              <span style={{ color: "#52c41a", fontSize: "14px" }}>
                discount here..
                {/* ({product.discount}) */}
              </span>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
