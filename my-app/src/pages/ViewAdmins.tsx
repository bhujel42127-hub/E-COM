import { Button, Form, Input, Modal, Space, type FormProps } from "antd";
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { openNotification } from "../lib/openNotification";
import type { Admin, Value } from "../Props";
import { useAdmin } from "../hooks/useGet";
import { fetcher } from "../services/fetcher";
import {
  useCreateAdmin,
  useDeleteAdmin,
  useUpdateAdmin,
} from "../hooks/usePosts";

export const ViewAdmins = () => {
  const [value, setValue] = useState<Value>({
    isModalOpen: false,
    isLoading: false,
    isEdit: false,
    total: 0,
  });
  const [admin, setAdmin] = useState<Admin[]>([]);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const { isLoading } = useAdmin();
  const updateAdmin = useUpdateAdmin();
  const deleteAdmin = useDeleteAdmin();
  const createAdmin = useCreateAdmin();
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

  const fetchAdmin = async () => {
    const res = await fetcher("/admins");

    setAdmin(res.admins);
    console.log("Admins: ", res.admins);
  };

  // useEffect(() => {
  //   fetchAdmin();
  // }, []);

  const handleCancel = () => {
    form.resetFields();
    resetValue();
  };

  const onFinish: FormProps<Admin>["onFinish"] = async (values) => {
    if (value.isEdit) {
      console.log("Admin edit reached");
      try {
        console.log("Admin edit try catch");
        await updateAdmin.mutateAsync(values);
        await fetchAdmin();
        resetValue();
        console.log("After Admin edit try catch");

        openNotification("success", "Product Edit", `Product edited`);
      } catch (error) {
        console.log("Error while editing admin: ", error);
      }
    } else {
      console.log("Adding admin...");
      await createAdmin.mutateAsync(values);
      // await mutator("POST", `admin/createAdmin/`, values);
      // await fetchAdmin();
      form.resetFields();
      resetValue();
      openNotification("success", "Admin Added", `Admin added`);
    }

    console.log("Admin added: ", values);
  };

  const handleDelete = async (id: string) => {
    console.log("handle delete reached");
    try {
      await deleteAdmin.mutateAsync(id);
      await fetchAdmin();
      resetValue();
      // await mutator("DELETE", `admin/deleteAdmin/${id}`);
    } catch (error) {
      console.log("Admin deletion error: ", error);
    }
    openNotification("success", "Admin Deleted", `Admin deleted`);
    console.log("reached");
  };

  const AdminTable = () => (
    <Table<Admin>
      rowKey={"_id"}
      dataSource={admin}
      columns={columns}
      loading={isLoading}
      scroll={{ x: 800 }}
      pagination={{
        current: page,
        pageSize: 5,
        total: value.total,
        onChange: (page) => {
          // fetchAdmin(page);
        },
      }}
    ></Table>
  );

  return (
    <div className="flex flex-col gap-4">
      <AdminTable />
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
        Add Admin
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
          <Form.Item<Admin> label="Admin ID" name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<Admin>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input admin name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Admin>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<Admin>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password" }]}
            hidden={value.isEdit}
          >
            <Input.Password />
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
