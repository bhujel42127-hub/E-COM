import { Col, Row, Button, Rate } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useGetProductBySlug } from "../../../hooks/useGet";

export const ProductContent = () => {
  const { slug } = useParams();
  const { data } = useGetProductBySlug(slug as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  console.log("Product slug:", slug);
  console.log("Product slug data:", data);

  // Mock data - replace with actual data from API
  const product = {
    name: data?.name || "Paloma",
    brandName: "Brand Name",
    seller: "Sellers Name",
    rating: 4.4,
    reviewCount: 36,
    price: 700,
    originalPrice: 1000,
    discount: 30,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      "red",
      "blue",
      "green",
    ],
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
    <div style={{ padding: "20px 40px", maxWidth: "1400px", margin: "0 auto" }}>
      <Row gutter={[40, 20]}>
        {/* Left Side - Images */}
        <Col xs={24} lg={12}>
          <Row gutter={16} style={{ flexWrap: "nowrap" }}>
            {/* Thumbnail Column */}
            <Col flex="70px">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        selectedImage === index
                          ? "2px solid #1a56db"
                          : "1px solid #e5e7eb",
                      transition: "all 0.2s",
                    }}
                  >
                    <img
                      alt={`${product.name} ${index + 1}`}
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </Col>

            {/* Main Image */}
            <Col flex="auto">
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  minHeight: "500px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  alt={product.name}
                  src={product.images[selectedImage]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>

        {/* Right Side - Product Details */}
        <Col xs={24} lg={12}>
          <div>
            {/* Product Title */}
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "6px",
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#111827",
              }}
            >
              {product.name}
            </h1>

            {/* Brand Name */}
            <div
              style={{
                fontSize: "15px",
                marginBottom: "2px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              {product.brandName}
            </div>

            {/* Seller */}
            <div
              style={{ color: "#6b7280", marginBottom: "14px", fontSize: "14px" }}
            >
              Sold By : {product.seller}
            </div>

            {/* Rating */}
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
                style={{ marginLeft: "12px", color: "#6b7280", fontSize: "14px" }}
              >
                {product.reviewCount} Reviews
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: "24px", display: "flex", alignItems: "baseline" }}>
              <span
                style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}
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
                <a
                  href="#"
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  Size Chart &gt;
                </a>
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
            <div style={{ marginBottom: "24px" }}>
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
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "6px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        selectedColor === index
                          ? "2px solid #111827"
                          : "1px solid #e5e7eb",
                      transition: "all 0.2s",
                    }}
                  >
                    <img
                      src={color}
                      alt={`Color ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Best Offers */}
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
                  <div key={index} style={{ lineHeight: "1.5", color: "#374151" }}>
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
              >
                Add to cart
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