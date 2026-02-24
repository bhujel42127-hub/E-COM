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
            className="h-[250px] object-cover"
          />
        }
      >
        <img
          src={deal.logo}
          alt="Brand"
          className="h-10 mb-4"
        />
        <h3 className="font-bold text-xl mb-2">{deal.title}</h3>
        <p className="text-gray-500 text-base">{deal.subtitle}</p>
      </Card>
    </Col>
  ));
};
