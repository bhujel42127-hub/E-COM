import { Card, Col, Row } from "antd";

export const ProductCard = () => {
  const trendingProducts = [
    {
      id: 1,
      title: "Womens Denim Jacket",
      brand: "Brand Name",
      rating: 4.4,
      currentPrice: "Rs. 700",
      originalPrice: "Rs. 1000",
      discount: "30% off",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    },
    {
      id: 2,
      title: "Womens Denim Jacket",
      brand: "Brand Name",
      rating: 4.4,
      currentPrice: "Rs. 700",
      originalPrice: "Rs. 1000",
      discount: "30% off",
      image:
        "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Womens Denim Jacket",
      brand: "Brand Name",
      rating: 4.4,
      currentPrice: "Rs. 700",
      originalPrice: "Rs. 1000",
      discount: "30% off",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Womens Denim Jacket",
      brand: "Brand Name",
      rating: 4.4,
      currentPrice: "Rs. 700",
      originalPrice: "Rs. 1000",
      discount: "30% off",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Womens Denim Jacket",
      brand: "Brand Name",
      rating: 4.4,
      currentPrice: "Rs. 700",
      originalPrice: "Rs. 1000",
      discount: "30% off",
      image:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop",
    },
    {
      id: 6,
      title: "Womens Denim Jacket",
      brand: "Brand Name",
      rating: 4.4,
      currentPrice: "Rs. 700",
      originalPrice: "Rs. 1000",
      discount: "30% off",
      image:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop",
    },
    {
      id: 7,
      title: "Womens Denim Jacket",
      brand: "Brand Name",
      rating: 4.4,
      currentPrice: "Rs. 700",
      originalPrice: "Rs. 1000",
      discount: "30% off",
      image:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop",
    },
  ];
  return (
    <Row gutter={[20, 20]} wrap={false}>
      {trendingProducts.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4.8} flex="0 0 280px">
          <Card
            hoverable
            cover={
              <img
                alt={product.title}
                src={product.image}
                style={{ minHeight: "100px", objectFit: "cover" }}
              />
            }
          >
            <h3
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                fontSize: "16px",
              }}
            >
              {product.title}
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
                {product.rating} ⭐
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
                {product.currentPrice}
              </span>
              <span
                style={{
                  color: "#999",
                  textDecoration: "line-through",
                  fontSize: "14px",
                }}
              >
                {product.originalPrice}
              </span>
              <span style={{ color: "#52c41a", fontSize: "14px" }}>
                ({product.discount})
              </span>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
