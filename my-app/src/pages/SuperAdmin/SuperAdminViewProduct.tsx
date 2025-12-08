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
import { SearchBar } from "../../components/SearchBar";

export const AdminViewProduct = () => {
  const [value, setValue] = useState<Value>({
    isModalOpen: false,
    isLoading: false,
    isEdit: false,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
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

  const onFinish: FormProps<Product>["onFinish"] = async (values) => {
    if (value.isEdit) {
      console.log("Product edit reached");
      try {
        console.log("Product edit try catch");
        await updateProduct.mutateAsync(values);
        form.resetFields();
        resetValue();
        console.log("After Product edit try catch");
        openNotification("success", "Product Edit", `Product edited`);
      } catch (error) {
        console.log("Error while editing Product: ", error);
      }
    } else {
      console.log("Adding Product...");
      await createProduct.mutateAsync(values);
      form.resetFields();
      resetValue();
      openNotification("success", "Product Added", `Product added`);
    }

    console.log("Product added: ", values);
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
    <div className="flex flex-col gap-4">
      {/* <SearchBar /> */}
      <ProductTable />
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setValue({
            ...value,
            isEdit: false,
            isModalOpen: true,
          });
        }}
        style={{ alignSelf: "flex-start" }}
      >
        Add Product
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={value.isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item<Product> label="Product ID" name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<Product>
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Product>
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<Product>
            label="Size"
            name="size"
            rules={[{ required: true, message: "Please choose size!" }]}
          >
            <Select
              options={[
                { label: "Extra Large (XL)", value: "XL" },
                { label: "Large (L)", value: "L" },
                { label: "Medium (M)", value: "M" },
                { label: "Small (S)", value: "S" },
                { label: "Extra Small (XS)", value: "XS" },
              ]}
            />
          </Form.Item>
          <Form.Item<Product>
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please choose color!" }]}
          >
            <Select
              options={[
                { label: "Blue", value: "blue" },
                { label: "Red", value: "red" },
                { label: "Green", value: "green" },
              ]}
            />
          </Form.Item>
          <Form.Item<Product>
            label="Seller"
            name="seller"
            rules={[{ required: true, message: "Please input seller name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<Product>
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please input brand name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
