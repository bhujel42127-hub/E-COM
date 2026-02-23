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
      await updateProduct.mutateAsync({ data: { ...values, slug: values.slug ? values.slug : values.name }, id });
      message.success("Product edited successfully!");
      navigate("/admin/products");
      return;
    }
    const productData = {
      ...values,
      slug: values.slug ? values.slug : values.name,
      image: imageUrl,
    };
    await createProduct.mutateAsync(productData);
    message.success("Product submitted successfully!");
    navigate("/admin/products");
  };

  return (
    <div className="p-6 bg-[#f5f5f5] min-h-screen">
      <Row gutter={24} wrap={false}>
        {/* LEFT COLUMN */}
        <Col style={{ width: "400px" }}>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <div className="bg-[silver] rounded-lg h-[250px] flex items-center justify-center text-white text-base font-medium">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Product Image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>Product Image 1</span>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          <Row>
            <Col className="flex w-[400px]">
              <div className="mt-5 flex-1 p-6 bg-white rounded-xl shadow-sm">
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <div className="flex items-center justify-center text-white text-base font-medium">
                      <UploadImage onUploadSuccess={handleUploadSuccess} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>

        {/* RIGHT COLUMN */}
        <Col style={{ width: "600px", flex: 1 }}>
          <div className="p-8 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 border-b-2 border-[#f0f0f0] pb-3">
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
                rules={[{ required: true, message: "Please enter product name" }]}
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
                  <Form.Item
                    label="Color"
                    name="color"
                    rules={[{ required: true, message: "Please select a color" }]}
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
                    rules={[{ required: true, message: "Please enter seller name" }]}
                  >
                    <Input size="large" placeholder="Select seller" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true, message: "Please enter brand name" }]}
                  >
                    <Input size="large" placeholder="Enter brand name" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Slug" name="slug">
                    <Input size="large" placeholder="Enter slug" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>

              <Button
                type="primary"
                block
                htmlType="submit"
                className="!h-12 !text-base !font-medium !rounded-md !bg-[#0a0e27]"
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
