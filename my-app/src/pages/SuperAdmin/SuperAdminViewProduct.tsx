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

  const [page] = useState(1);
  const navigate = useNavigate();
  const deleteProduct = useDeleteProduct();
  const { data, isLoading } = useGetAllProduct();

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
      render: (color: { _id?: string; name: string; hex: string }[]) => (
        <>
          {color?.map((c) => (
            <Tag
              key={c.hex}
              className="p-0 inline-flex items-center bg-white gap-1"
            >
              <span className="w-[22px] h-[22px] rounded-sm" />
              {c.name}
            </Tag>
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
    navigate(`add/${data._id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
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
        onChange: (_page) => {
          // fetchProduct(_page);
        },
      }}
    ></Table>
  );

  return (
    <div className="m-6 p-6 min-h-[280px] bg-white rounded-lg overflow-auto">
      <ProductTable />
      <Button
        className="mt-2.5"
        type="primary"
        onClick={() => navigate("/admin/products/add")}
      >
        Add Product
      </Button>
    </div>
  );
};
