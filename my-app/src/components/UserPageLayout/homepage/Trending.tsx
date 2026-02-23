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
              <Card className="overflow-hidden rounded-lg">
                <Row className="min-h-[400px]">
                  {index === 0 ? (
                    <>
                      <Col span={12}>
                        <div
                          className="h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${offer.image})`,
                          }}
                        />
                      </Col>
                      <Col span={12}>
                        <div className="h-full flex flex-col justify-center items-center p-10 bg-white">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png"
                            alt="Brand"
                            className="h-[50px] mb-5"
                          />
                          <h3 className="text-[32px] font-bold mb-5">
                            Min 60% off
                          </h3>
                          <button className="py-2.5 px-[30px] border-2 border-black bg-transparent cursor-pointer text-base rounded">
                            Explore
                          </button>
                        </div>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col span={12}>
                        <div className="h-full flex flex-col justify-center items-center p-10 bg-white">
                          <h3 className="text-5xl font-bold mb-5 tracking-[2px]">
                            FOREVER 21
                          </h3>
                          <h4 className="text-[32px] font-bold mb-5">
                            Min 50% off
                          </h4>
                          <button className="py-2.5 px-[30px] border-2 border-black bg-transparent cursor-pointer text-base rounded">
                            Explore
                          </button>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          className="h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${offer.image})`,
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
