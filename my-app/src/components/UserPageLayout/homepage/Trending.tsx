import { Card, Col, Row } from "antd";

export const Trending = () => {
  return (
    <>
      <div className="mx-auto px-4 sm:px-12">
        <h2 className="text-3xl font-bold mb-8">Trending Offers</h2>
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
                          style={{ backgroundImage: `url(${offer.image})` }}
                        />
                      </Col>
                      <Col span={12}>
                        <div className="h-full flex flex-col justify-center items-center p-10 bg-white">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png"
                            alt="Brand"
                            className="h-[50px] mb-5"
                          />
                          <h3 className="text-3xl font-bold mb-5">
                            Min 60% off
                          </h3>
                          <button className="px-8 py-2.5 border-2 border-primary text-primary bg-transparent cursor-pointer text-base rounded hover:bg-primary hover:text-white transition-colors">
                            Explore
                          </button>
                        </div>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col span={12}>
                        <div className="h-full flex flex-col justify-center items-center p-10 bg-white">
                          <h3 className="text-5xl font-bold mb-5 tracking-widest">
                            FOREVER 21
                          </h3>
                          <h4 className="text-3xl font-bold mb-5">
                            Min 50% off
                          </h4>
                          <button className="px-8 py-2.5 border-2 border-primary text-primary bg-transparent cursor-pointer text-base rounded hover:bg-primary hover:text-white transition-colors">
                            Explore
                          </button>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          className="h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${offer.image})` }}
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
