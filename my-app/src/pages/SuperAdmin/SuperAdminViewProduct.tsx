import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  type FormProps,
} from "antd";
import { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { openNotification } from "../../lib/openNotification";
import type { Product, Value } from "../../Props";
import { useGetProduct } from "../../hooks/useGet";

import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../../hooks/productHooks";
import { replace, useNavigate } from "react-router-dom";

export const AdminViewProduct = () => {
  const [value, setValue] = useState<Value>({
    isModalOpen: false,
    isLoading: false,
    isEdit: false,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading } = useGetProduct();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
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
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 200,
      ellipsis: true,
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
          <Button
            onClick={() => {
              console.log("Record: ", record);
              form.setFieldsValue(record);
              setValue({
                ...value,
                isEdit: true,
                isModalOpen: true,
              });
            }}
          >
            Edit
          </Button>
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

  const resetValue = () => {
    setValue((prev) => ({
      ...prev,
      isModalOpen: false,
      isLoading: false,
      isEdit: false,
    }));
  };

  // const fetchProduct = async () => {
  //   const res = await fetcher("/products");
  //   console.log("fetching Product!", res);

  //   setProduct(res.products);
  //   // console.log("Products: ", res.Products);
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  const handleCancel = () => {
    form.resetFields();
    resetValue();
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
    openNotification("success", "Product Deleted", `Product deleted`);
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
      <Button style={{marginTop:"10px"}} type="primary" onClick={() => navigate("/admin/products/add") }>
        Add Product
      </Button>
    </div>
  );
};
