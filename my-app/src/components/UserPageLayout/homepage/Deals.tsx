import { Row } from "antd";
import { DealsData } from "./DealsData";

export const Deals = () => {
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
          Deals of the Day
        </h2>
        <div
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Row gutter={[20, 20]} wrap={false} style={{ paddingBottom: "10px" }}>
            <DealsData />
          </Row>
        </div>
      </div>
    </>
  );
};
