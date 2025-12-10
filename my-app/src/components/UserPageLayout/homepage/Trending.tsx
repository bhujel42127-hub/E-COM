import { Card, Col, Row } from "antd";

export const Trending = () => {
  return (
    <>
      <div
        className="container"
        style={{ margin: "0 auto", padding: "0 50px" }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Trending Offers
        </h2>
        <Row gutter={[30, 30]}>
          {[
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&h=400&fit=crop",
              type: "image-left",
            },
            {
              id: 2,
              image:
                "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop",
              type: "image-right",
            },
          ].map((offer, index) => (
            <Col key={offer.id} xs={24} md={12}>
              <Card style={{ overflow: "hidden", borderRadius: "8px" }}>
                <Row style={{ minHeight: "400px" }}>
                  {index === 0 ? (
                    <>
                      <Col span={12}>
                        <div
                          style={{
                            height: "100%",
                            backgroundImage: `url(${offer.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </Col>
                      <Col span={12}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "40px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png"
                            alt="Brand"
                            style={{ height: "50px", marginBottom: "20px" }}
                          />
                          <h3
                            style={{
                              fontSize: "32px",
                              fontWeight: "bold",
                              marginBottom: "20px",
                            }}
                          >
                            Min 60% off
                          </h3>
                          <button
                            style={{
                              padding: "10px 30px",
                              border: "2px solid #000",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              fontSize: "16px",
                              borderRadius: "4px",
                            }}
                          >
                            Explore
                          </button>
                        </div>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col span={12}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "40px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "48px",
                              fontWeight: "bold",
                              marginBottom: "20px",
                              letterSpacing: "2px",
                            }}
                          >
                            FOREVER 21
                          </h3>
                          <h4
                            style={{
                              fontSize: "32px",
                              fontWeight: "bold",
                              marginBottom: "20px",
                            }}
                          >
                            Min 50% off
                          </h4>
                          <button
                            style={{
                              padding: "10px 30px",
                              border: "2px solid #000",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              fontSize: "16px",
                              borderRadius: "4px",
                            }}
                          >
                            Explore
                          </button>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          style={{
                            height: "100%",
                            backgroundImage: `url(${offer.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
