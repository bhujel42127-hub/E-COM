import { Row } from "antd";
import { DealsData } from "./DealsData";

export const Deals = () => {
  return (
    <>
      <div className="container mx-auto px-12">
        <h2 className="text-[32px] font-bold mb-[30px]">
          Deals of the Day
        </h2>
        <div className="overflow-x-auto no-scrollbar">
          <Row gutter={[20, 20]} wrap={false} className="pb-2.5">
            <DealsData />
          </Row>
        </div>
      </div>
    </>
  );
};
