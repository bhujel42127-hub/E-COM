import { Col, Row } from "antd";

export const ProductContent = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={2}>
              <Row gutter={[0, 4]}>
                <Col span={24}>
                  <div
                    style={{
                      backgroundColor: "red",
                      height: "75px",
                      width: "75px",
                    }}
                  >
                    Thumbnail 1
                  </div>
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      backgroundColor: "blue",
                      height: "75px",
                      width: "75px",
                    }}
                  >
                    Thumbnail 2
                  </div>
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      backgroundColor: "black",
                      height: "75px",
                      color: "white",
                      width: "75px",
                    }}
                  >
                    Thumbnail 3
                  </div>
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      backgroundColor: "purple",
                      height: "75px",
                      color: "white",
                      width: "75px",
                    }}
                  >
                    Thumbnail 4
                  </div>
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      backgroundColor: "yellow",
                      height: "75px",
                      width: "75px",
                    }}
                  >
                    Thumbnail 5
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={18}>
              <div style={{ backgroundColor: "green", height: "400px" }}>
                Large image area
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
    </>
  );
};
