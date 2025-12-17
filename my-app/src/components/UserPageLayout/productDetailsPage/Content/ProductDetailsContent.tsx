import { Col, Row, Button, Rate, Tag } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useGetProductBySlug } from "../../../../hooks/useGet";
import { LeftColumn } from "./LeftColumn";

export const ProductContent = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data } = useGetProductBySlug(slug as string);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // console.log("Product slug:", slug);
  console.log("Product slug data:", data);

  // const handleAddToCart = () => {
  //   navigate()
  // }

  const product = {
    name: data?.name || "Paloma",
    brandName: data?.brand,
    seller: data?.seller,
    rating: 4.4,
    reviewCount: 36,
    price: data?.price,
    originalPrice: 1000,
    // discount: 30,
    sizes: Array.isArray(data?.size) ? data.size : [],
    colors: Array.isArray(data?.color) ? data.color : [],
    offers: [
      { label: "Special offer", text: "get 25% off", link: "T&C" },
      {
        label: "Bank offer",
        text: "get 30% off on Axis Bank Credit card",
        link: "T&C",
      },
      {
        label: "Wallet offer",
        text: "get 40% cashback via Paytm wallet on first transaction",
        link: "T&C",
      },
      { label: "Special offer", text: "get 25% off", link: "T&C" },
    ],
  };

  return (
    <div
      style={{
        padding: "0 40px",
        maxWidth: "1400px",
        height: "100%",
        marginTop: "5px",
      }}
    >
      <Row gutter={[40, 20]}>
        {/* Left Side */}
        {/*  */}
        {/*  */}

        <>
          <LeftColumn />
        </>
        {/* Right Column */}
        {/*  */}
        {/*  */}
        <Col xs={24} lg={12}>
          <div>
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "6px",
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#111827",
              }}
            >
              {data?.name}
            </h1>

            <div
              style={{
                fontSize: "15px",
                marginBottom: "2px",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              {product.brandName}
            </div>

            <div
              style={{
                color: "#000000",
                marginBottom: "14px",
                fontSize: "12px",
              }}
            >
              Sold By : {product.seller}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <Rate
                disabled
                defaultValue={product.rating}
                allowHalf
                style={{ fontSize: "18px", color: "#fbbf24" }}
              />
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#111827",
                }}
              >
                {product.rating}
              </span>
              <span
                style={{
                  marginLeft: "12px",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {product.reviewCount} Reviews
              </span>
            </div>

            <div
              style={{
                marginBottom: "14px",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <span
                style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}
              >
                Rs. {product.price}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: "#9ca3af",
                  textDecoration: "line-through",
                  marginLeft: "10px",
                }}
              >
                Rs. {product.originalPrice}
              </span>
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "16px",
                  color: "#10b981",
                  fontWeight: 600,
                }}
              >
                ({product.discount}% off)
              </span>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "14px",
                }}
              >
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    margin: 0,
                    color: "#111827",
                  }}
                >
                  Select Size
                </h4>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: "50px",
                      height: "50px",
                      fontSize: "14px",
                      fontWeight: 500,
                      border:
                        selectedSize === size
                          ? "2px solid #111827"
                          : "1px solid #d1d5db",
                      backgroundColor: "#ffffff",
                      color: selectedSize === size ? "#111827" : "#6b7280",
                      borderRadius: "50%",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {/*  */}
            {/*  */}
            <div style={{ marginBottom: "10px" }}>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "14px",
                  color: "#111827",
                }}
              >
                Select Color
              </h4>
              <div style={{ display: "flex", gap: "10px" }}>
                    {product?.colors.map((c) => (
                      <Tag
                        key={c.hex}
                        style={{
                          padding: 0,
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#ffffff",
                          gap: "4px",
                        }}
                      >
                        <span
                          style={{
                            width: 42,
                            height: 42,
                            backgroundColor: c.hex || "",
                            borderRadius: "8px",
                          }}
                        />
                      </Tag>
                    ))}
              </div>
            </div>

            {/* Best Offers */}
            {/*  */}
            {/*  */}
            <div style={{ marginBottom: "28px" }}>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "14px",
                  color: "#111827",
                }}
              >
                Best Offers
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                {product.offers.map((offer, index) => (
                  <div
                    key={index}
                    style={{ lineHeight: "1.5", color: "#374151" }}
                  >
                    <span style={{ fontWeight: 600 }}>{offer.label}</span>{" "}
                    <span>{offer.text}</span>{" "}
                    <a
                      href="#"
                      style={{
                        color: "#1a56db",
                        textDecoration: "none",
                        marginLeft: "4px",
                      }}
                    >
                      {offer.link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {/*  */}
            {/*  */}
            <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
              <Button
                type="primary"
                size="large"
                style={{
                  height: "50px",
                  width: "150px",
                  fontSize: "15px",
                  fontWeight: 600,
                  backgroundColor: "#1e3a8a",
                  borderColor: "#1e3a8a",
                  borderRadius: "10px",
                }}
                onClick={() => navigate("/myCart")}
              >
                Add to Cart
              </Button>
              <Button
                size="large"
                icon={isWishlisted ? <HeartFilled /> : <HeartOutlined />}
                onClick={() => setIsWishlisted(!isWishlisted)}
                style={{
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isWishlisted ? "#ef4444" : "#6b7280",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
