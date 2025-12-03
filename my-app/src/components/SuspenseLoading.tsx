import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SuspenseLoading() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 32,
        color: "#4d90ff",
      }}
      spin
    />
  );
  return (
    <div className="flex items-center justify-center h-full bg-primaryLight">
      <div className="suspenseLoading text-center">
        <Spin indicator={antIcon} />
        <h1 className="text-primary text-base lg:text-xl font-medium capitalize">
          Loading
        </h1>
      </div>
    </div>
  );
}
