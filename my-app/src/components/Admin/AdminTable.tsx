import type { ColumnsType } from "antd/es/table";
import type { Admin } from "../../Props";
import { Button, Space, Table } from "antd";

const columns: ColumnsType<Admin> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Action",
    key: "action",
    width: 150,
    render: (_: unknown, record: Admin) => (
      <Space size="middle">
        <Button>Edit</Button>
        <Button danger>Delete</Button>
      </Space>
    ),
  },
];

export const AdminTable = ({
  admin,
  isLoading,
  page,
  total,
}: {
  admin: Admin[];
  isLoading: boolean;
  page: number;
  total: number;
}) => (
  <Table<Admin>
    rowKey={"_id"}
    dataSource={admin}
    columns={columns}
    loading={isLoading}
    scroll={{ x: 800 }}
    pagination={{
      current: page,
      pageSize: 5,
      total: total,
    }}
  />
);