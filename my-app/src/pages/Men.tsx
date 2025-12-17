import { Link } from "react-router-dom";
import { ProductCard } from "../components/UserPageLayout/homepage/ProductCard";

export const Men = () => {
  return (
    <div style={{ flex: 1 }}>
      <h3
        style={{
          color: "#000000",
          display: "inline-block",
          fontSize: "24px",
          fontWeight: "bold",
          padding: "0 50px",
          margin: "0 auto",
        }}
      >
        Shoes
      </h3>
      <div
        className="container"
        style={{
          margin: "0 auto",
          marginBottom: "10px",
          padding: "0 50px",
          overflowX: "auto",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Link to="/men/shoes"></Link>
        <ProductCard />
      </div>
      <h3
        style={{
          color: "#000000",
          display: "inline-block",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 auto",
          padding: "0 50px",
        }}
      >
        T-shirt
      </h3>
      <div
        className="container"
        style={{
          margin: "0 auto",
          marginBottom: "10px",
          padding: "0 50px",
          overflowX: "auto",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Link to="men/t-shirt"></Link>
        <ProductCard />
      </div>
      <h3
        style={{
          color: "#000000",
          display: "inline-block",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 auto",
          padding: "0 50px",
        }}
      >
        Kattu
      </h3>
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
        <Link to="men/kattu"></Link>
        <ProductCard />
      </div>
    </div>
  );
};
