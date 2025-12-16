import { Button, message, Space, Tag } from "antd";
import { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Product, Value } from "../../Props";
import { useGetAllProduct } from "../../hooks/useGet";

import { useDeleteProduct } from "../../hooks/productHooks";
import { useNavigate } from "react-router-dom";

export const AdminViewProduct = () => {
  const [value, setValue] = useState<Value>({
    isModalOpen: false,
    isLoading: false,
    isEdit: false,
    total: 0,
  });

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const deleteProduct = useDeleteProduct();
  const { data, isLoading } = useGetAllProduct();

  console.log("Fetched product: ", data);

  const columns: ColumnsType<Product> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 200,
      ellipsis: true,
      // render: (size: string[]) => size?.join(", "),
      render: (sizes: string[]) => (
        <>
          {sizes?.map((size) => (
            <Tag key={size}>{size}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 200,
      ellipsis: true,
      // render: (size: string[]) => size?.join(", "),
      render: (color: string[]) => (
        <>
          {color?.map((color) => (
            <Tag key={color}>{color}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "seller",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_: unknown, record: Product) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const resetValue = () => {
    setValue((prev) => ({
      ...prev,
      isModalOpen: false,
      isLoading: false,
      isEdit: false,
    }));
  };

  const handleEdit = async (data: Product) => {
    console.log("data to be edited: ", data);
    navigate(`add/${data._id}`);
  };
  const handleDelete = async (id: string) => {
    console.log("handle delete reached");
    try {
      await deleteProduct.mutateAsync(id);
      console.log("after deleteProduct delete");
      resetValue();
    } catch (error) {
      console.log("Product deletion error: ", error);
    }
    message.success("Product deleted!");
  };

  const ProductTable = () => (
    <Table<Product>
      rowKey={"_id"}
      dataSource={data?.products}
      columns={columns}
      loading={isLoading}
      scroll={{ x: 800 }}
      pagination={{
        current: page,
        pageSize: 5,
        total: value.total,
        onChange: (page) => {
          // fetchProduct(page);
        },
      }}
    ></Table>
  );

  return (
    <div
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: "#ffffff",
        borderRadius: "8px",
        overflow: "auto",
      }}
    >
      {/* <SearchBar /> */}
      <ProductTable />
      <Button
        style={{ marginTop: "10px" }}
        type="primary"
        onClick={() => navigate("/admin/products/add")}
      >
        Add Product
      </Button>
    </div>
  );
};
