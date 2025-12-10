import { Col, Input, Row } from "antd";

export const FooterContent = () => {
  return (
    <>
      {/* Logo */}
      <div style={{ marginBottom: "50px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>
          LOGO
        </h2>
      </div>

      <Row gutter={[0, 0]}>
        {[
          {
            title: "Women",
            links: ["All Women", "Skirts", "T- Shirts", "Tops", "Jackets"],
          },
          {
            title: "Men",
            links: ["All Men", "Shirts", "T- Shirts", "Shorts", "Jackets"],
          },
          {
            title: "Kids",
            links: ["All Kids", "Shirts", "T- Shirts", "Shorts", "Jackets"],
          },
          {
            title: "Shopping",
            links: [
              "Your cart",
              "your orders",
              "Compared items",
              "Wishlist",
              "Shipping Details",
            ],
          },
          {
            title: "More links",
            links: [
              "Blogs",
              "Gift center",
              "Buying guides",
              "New arrivals",
              "Clearance",
            ],
          },
        ].map((column, index) => (
          <Col
            key={index}
            xs={12}
            sm={8}
            md={4}
            lg={4}
            style={{ paddingRight: 0, paddingLeft: 0 }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              {column.title}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {column.links.map((link, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#ffffff",
                      textDecoration: "none",
                      opacity: 0.8,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        ))}

        <Col
          xs={24}
          sm={16}
          md={8}
          lg={4}
          style={{ paddingRight: 0, paddingLeft: 0 }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Stay In Touch
          </h3>
          <p
            style={{
              opacity: 0.8,
              marginBottom: "20px",
              lineHeight: "1.6",
            }}
          >
            Stay in touch to get special offers, free giveaways and once in a
            lifetime deals
          </p>
          <Input
            placeholder="Enter your email"
            prefix={<span>✉</span>}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              padding: "10px 15px",
              borderRadius: "4px",
            }}
          />
        </Col>
      </Row>

      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          marginTop: "50px",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "30px" }}>
          {["Terms & Conditions", "Privacy Policy"].map((text, i) => (
            <a
              key={i}
              href="#"
              style={{
                color: "#ffffff",
                opacity: 0.8,
              }}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
