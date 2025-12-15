import { Link } from "react-router-dom";
import { ProductCard } from "../components/UserPageLayout/homepage/ProductCard";

export const Men = () => {
  return (
    <div style={{ flex: 1 }}>
      <div
        className="container"
        style={{
          margin: "0 auto",
          padding: "0 50px",
          overflowX: "auto",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Link to="/men/shoes">
          <h3
            style={{
              color: "#000000",
              display: "inline-block",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            Shoes
          </h3>
        </Link>
        <ProductCard />
      </div>
      <div
        className="container"
        style={{
          margin: "0 auto",
          padding: "0 50px",
          overflowX: "auto",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Link to="men/t-shirt">
          <h3
            style={{
              color: "#000000",
              display: "inline-block",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            T-shirt
          </h3>
        </Link>
        <ProductCard />
      </div>
      <div
        className="container"
        style={{
          margin: "0 auto",
          padding: "0 50px",
          overflowX: "auto",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Link to="men/kattu">
          <h3
            style={{
              color: "#000000",
              display: "inline-block",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            Kattu
          </h3>
        </Link>
        <ProductCard />
      </div>
    </div>
  );
};
