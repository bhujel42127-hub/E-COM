import { Card, Col } from "antd";

export const DealsData = () => {
  const data = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
      title: "Best of Styles",
      subtitle: "Under Rs.799",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
      title: "Best of Styles",
      subtitle: "Under Rs.799",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
      title: "Best of Styles",
      subtitle: "Under Rs.799",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png",
      title: "Best of Styles",
      subtitle: "Under Rs.799",
    },
  ];
  return data.map((deal) => (
    <Col key={deal.id} flex="0 0 300px">
      <Card
        hoverable
        cover={
          <img
            alt={deal.title}
            src={deal.image}
            style={{ height: "250px", objectFit: "cover" }}
          />
        }
      >
        <img
          src={deal.logo}
          alt="Brand"
          style={{ height: "40px", marginBottom: "15px" }}
        />
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "8px",
          }}
        >
          {deal.title}
        </h3>
        <p style={{ color: "#666", fontSize: "16px" }}>{deal.subtitle}</p>
      </Card>
    </Col>
  ));
};
