import { Col, Row } from "antd";

export const ProductContent = () => {
  return (
    <>
      <Row gutter={[20, 0]}>
        <Col xs={24} md={12}>
          <Row gutter={16} align="top" style={{ flexWrap: "nowrap" }}>
            <Col
              xs={24}
              sm={6}
              md="75px"
              flex="75px"
              style={{ marginLeft: "40px" }}
            >
              <Row gutter={[0, 8]}>
                {["red", "blue", "black", "purple", "yellow"].map(
                  (color, i) => (
                    <Col span={24} key={i}>
                      <div
                        style={{
                          backgroundColor: color,
                          height: "75px",
                          width: "75px",
                          borderRadius: "10px",
                          color:
                            color === "black" || color === "purple"
                              ? "white"
                              : "black",
                        }}
                      >
                        Thumbnail {i + 1}
                      </div>
                    </Col>
                  )
                )}
              </Row>
            </Col>

            <Col xs={24} sm={18} md="auto" flex="auto">
              <div
                style={{
                  backgroundColor: "green",
                  height: "400px",
                  borderRadius: "10px",
                }}
              >
                Large image area
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <div>
            <h2></h2>
          </div>
        </Col>
      </Row>
    </>
  );
};
