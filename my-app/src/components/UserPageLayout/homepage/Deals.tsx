import { Row } from "antd";
import { DealsData } from "./DealsData";

export const Deals = () => {
  return (
    <>
      <div className="mx-auto px-4 sm:px-12">
        <h2 className="text-3xl font-bold mb-8">Deals of the Day</h2>
        <div className="overflow-x-auto [scrollbar-width:none]">
          <Row gutter={[20, 20]} wrap={false} className="!pb-2">
            <DealsData />
          </Row>
        </div>
      </div>
    </>
  );
};
