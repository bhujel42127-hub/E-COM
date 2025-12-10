import { Button, Col, Form, Input, Row, Select, type FormProps } from "antd";
import type { Product } from "../../Props";

export const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<Product>["onFinish"] = async (values) => {
    
  };
  return (
    <div style={{ padding: "24px" }}>
      <div>
        <Row gutter={24} wrap>
          {/* Left Column */}
          <Col flex="auto">
            <div
              style={{
                padding: 24,
                background: "#ffffff",
                borderRadius: "8px",
              }}
            >
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <div
                    style={{
                      background: "#fafafa",
                      borderRadius: "8px",
                      height: 150,
                    }}
                  ></div>
                </Col>

                <Col span={24}>
                  <div
                    style={{
                      background: "#fafafa",
                      borderRadius: "8px",
                      height: 150,
                    }}
                  ></div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Right Column */}
          <Col flex="auto">
            <div
              style={{
                padding: 24,
                background: "#ffffff",
                borderRadius: "8px",
                height: "100%",
              }}
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
                  rules={[
                    { required: true, message: "Please input product name!" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please input seller name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Product>
                  label="Brand"
                  name="brand"
                  rules={[
                    { required: true, message: "Please input brand name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
