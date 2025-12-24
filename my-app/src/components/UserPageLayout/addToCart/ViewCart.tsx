import { Button, Divider, Image, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import type { Product } from "../../../Props";
import { useDeleteCartItem, useGetCartItems } from "../../../hooks/cartHook";
import { useState } from "react";

export const ViewCart = () => {
  const useDelete = useDeleteCartItem();
  
  const { data, isLoading, isFetching } = useGetCartItems();
  const { Text } = Typography;

  console.log("Product data:", data, isLoading, isFetching);

  const handleDelete = async (productId: string) => {
    console.log("Delete product with id:", productId);
    await useDelete.mutateAsync(productId);
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_: unknown, record) => (
        <Space>
          <Image
            src={record.product.image || "image"}
            alt="Product"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <Text strong>{record.product.name} ({}) </Text>
        </Space>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
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

  const cartItems = data?.cartItems || [];

  const tableData = cartItems?.map((item) => ({
    _id: item._id,
    product: {
      name: item.productId?.name,
      image: item.productId?.imageUrl,  
    },
    quantity: item.quantity,
    price: "$" + item.productId?.price,
    total: "$" + item.productId?.price * item.quantity,
  }));

  return (
    <div className="m-4">
      <Divider />
      <Table<Product>
        rowKey={"_id"}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={tableData}
        loading={isLoading || isFetching}
      />
    </div>
  );
};
