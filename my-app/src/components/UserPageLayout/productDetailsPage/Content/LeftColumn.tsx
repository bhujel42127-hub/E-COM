import { Col, Row } from "antd";
import { useState } from "react";
import { useGetProductBySlug } from "../../../../hooks/useGet";
import { useParams } from "react-router-dom";

export const LeftColumn = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const {slug} = useParams();
  const { data } = useGetProductBySlug(slug as string);

  const product = {
    name: data?.name || "Paloma",
    brandName: data?.brand,
    seller: data?.seller,
    rating: 4.4,
    reviewCount: 36,
    price: data?.price,
    originalPrice: 1000,
    // discount: 30,
    images: [data?.imageUrl || ""],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["red", "blue", "green"],
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
    <>
      <Col xs={24} lg={12} >
        <Row gutter={16} style={{ flexWrap: "nowrap" }}>
          {/* Thumbnail Column */}
          {/*  */}
          {/*  */}
          <Col flex="auto">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    maxHeight: "70px",
                    maxWidth: "100px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
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

          {/* Main Product Image */}
          {/*  */}
          {/*  */}
          <Col>
            <div
              style={{
                backgroundColor: "#f9fafb",
                maxHeight: "550px",
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
    </>
  );
};
