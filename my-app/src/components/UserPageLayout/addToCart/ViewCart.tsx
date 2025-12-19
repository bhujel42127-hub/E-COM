import { Button, Divider, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import type { Product } from "../../../Props";
import { useDeleteCartItem, useGetCartItems } from "../../../hooks/cartHook";

export const ViewCart = () => {
  const { data, isLoading } = useGetCartItems();
  const useDelete = useDeleteCartItem();

  const handleDelete = async(productId: string) => {
    console.log("Delete product with id:", productId);
    await useDelete.mutateAsync(productId);
  };

  const columns: TableColumnsType<Product> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Product"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_: unknown, record: Product) => (
        <Space size="middle">
          <Button
            danger
            onClick={() => {
              handleDelete(record._id as string);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection: TableProps<Product>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const cartItems = data?.cartItems.map((item) => ({
    _id: item._id,
    name: item.productId?.name,
    price: item.productId?.price,
    quantity: item.quantity,
    image: item.productId.imageUrl,
  }));

  return (
    <div>
      <Divider />
      <Table<Product>
        rowKey={"_id"}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={cartItems}
        loading={isLoading}
      />
    </div>
  );
};
