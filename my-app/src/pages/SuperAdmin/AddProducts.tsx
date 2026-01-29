import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  message,
} from "antd";
import type { Product } from "../../Props";
import { useCreateProduct, useUpdateProduct } from "../../hooks/productHooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProduct } from "../../hooks/useGet";
import { UploadImage } from "../../components/upload";

export default function AddProduct() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { data } = useGetProduct(id as string);
  const productData = data?.product;

  useEffect(() => {
    if (!id) return;
    if (productData && id) {
      form.setFieldsValue(productData);
    }
  }, [productData, form, id]);

  const handleUploadSuccess = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const handleSubmit = async (values: Product) => {
    if (isEdit && id) {
      console.log("in edit mode");
      await updateProduct.mutateAsync({ data: {...values, slug: values.slug ? values.slug : values.name}, id });
      message.success("Product edited successfully!");
      navigate("/admin/products");
      return
    }
    const productData = {
      ...values,
      slug: values.slug? values.slug : values.name,  
      image: imageUrl,
    };
    console.log("Product data:", productData);
    await createProduct.mutateAsync(productData);
    message.success("Product submitted successfully!");
    navigate("/admin/products");
  };

  // const handleCancel = () => {
  //   form.resetFields();
  //   openModal(false);
  // };

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      <Row gutter={24} wrap={false}>
        {/* LEFT COLUMN */}
        {/*  */}
        {/*  */}
        <Col style={{ width: "400px" }}>
          <div
            style={{
              padding: 24,
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <div
                  style={{
                    background: "silver",
                    borderRadius: "8px",
                    height: 250,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Product Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>Product Image 1</span>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col style={{ display: "flex", width: "400px" }}>
              <div
                style={{
                  marginTop: "20px",
                  flex: 1,
                  padding: 24,
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <div
                      style={{
                        // height: 150,
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      <UploadImage onUploadSuccess={handleUploadSuccess} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>

        {/* RIGHT COLUMN */}
        {/*  */}
        {/*  */}
        <Col style={{ width: "600px", flex: 1 }}>
          <div
            style={{
              padding: 32,
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "24px",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "12px",
              }}
            >
              Product Details
            </h2>

            <Form<Product>
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
              >
                <Input size="large" placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                label="Price ($)"
                name="price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input size="large" type="number" placeholder="0.00" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Size"
                    name="size"
                    rules={[{ required: true, message: "Please select size" }]}
                  >
                    <Select
                      mode="multiple"
                      size="large"
                      placeholder="Select size"
                      options={[
                        { label: "Extra Large (XL)", value: "XL" },
                        { label: "Large (L)", value: "L" },
                        { label: "Medium (M)", value: "M" },
                        { label: "Small (S)", value: "S" },
                        { label: "Extra Small (XS)", value: "XS" },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  {/* <Form.Item
                    label="Color"
                    name="color"
                    rules={[
                      { required: true, message: "Please select a color" },
                    ]}
                  >
                    <Button
                      onClick={() => {
                        form.resetFields(),
                        openModal(true);
                      }}
                    >
                      Add Color
                    </Button>
                    <Modal open={modal} onCancel={handleCancel}>
                      <Form.Item>

                      <ColorPicker size="large"></ColorPicker>
                      </Form.Item>
                    </Modal>
                  </Form.Item> */}
                  <Form.Item
                    label="Color"
                    name="color"
                    rules={[
                      { required: true, message: "Please select a color" },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      size="large"
                      labelInValue
                      placeholder="Select color"
                      options={[
                        { label: "Blue", value: "#0000FF" },
                        { label: "Red", value: "#FF0000" },
                        { label: "Green", value: "#00FF00" },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Seller"
                    name="seller"
                    rules={[
                      { required: true, message: "Please enter seller name" },
                    ]}
                  >
                    <Input size="large" placeholder="Select seller" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[
                      { required: true, message: "Please enter brand name" },
                    ]}
                  >
                    <Input size="large" placeholder="Enter brand name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Slug"
                    name="slug"
                    // rules={[{
                    //   required: true,
                    //   message: "Please enter slug!"
                    // }]}
                  >
                    <Input size="large" placeholder="Enter slug" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Description" name="description">
                <Input.TextArea
                  rows={4}
                  placeholder="Enter product description"
                />
              </Form.Item>

              <Button
                type="primary"
                block
                htmlType="submit"
                style={{
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: 500,
                  borderRadius: "6px",
                  background: "#0a0e27",
                }}
              >
                Submit Product
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
