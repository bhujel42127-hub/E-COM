import { Button, Divider, Image, Space, Table, Typography, Tag } from "antd";
import type { TableProps } from "antd";
import type { Product } from "../../../Props";
import { useDeleteCartItem, useGetCartItems } from "../../../hooks/cartHook";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const ViewCart = () => {
  const useDelete = useDeleteCartItem();
  const navigate = useNavigate();
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
      render: (_: unknown, record: any) => (
        <Space>
          <Image
            src={record.product.image || "image"}
            alt="Product"
            className="!w-16 !h-16 object-cover rounded-lg"
          />
          <Text strong className="text-[#0a0e27]">
            {record.product.name}
          </Text>
        </Space>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty: number) => (
        <Tag className="text-sm font-semibold px-3 py-0.5 rounded-full border-gray-200">
          {qty}
        </Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: string) => (
        <span className="font-semibold text-[#0a0e27]">{price}</span>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: string) => (
        <span className="font-black text-[#0a0e27] text-base">{total}</span>
      ),
    },
    {
      title: "",
      key: "action",
      width: 80,
      render: (_: unknown, record: Product) => (
        <button
          onClick={() => handleDelete(record._id as string)}
          className="text-gray-400 hover:text-[#e11d48] transition-colors p-2 rounded-lg hover:bg-red-50"
          title="Remove item"
        >
          <DeleteOutlined className="text-base" />
        </button>
      ),
    },
  ];

  const rowSelection: TableProps<Product>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
  };

  const cartItems = data?.cartItems || [];

  const tableData = cartItems.map((item: any) => ({
    _id: item._id,
    product: {
      name: item.productId?.name,
      image: item.productId?.imageUrl,
    },
    quantity: item.quantity,
    price: "₹" + item.productId?.price,
    total: "₹" + item.productId?.price * item.quantity,
  }));

  const grandTotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  if (!isLoading && cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingOutlined className="text-6xl text-gray-200 mb-6" />
        <h2 className="text-2xl font-black text-[#0a0e27] mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Button
          type="primary"
          size="large"
          className="!bg-[#0a0e27] !border-[#0a0e27] !rounded-xl !font-bold !px-8"
          onClick={() => navigate("/home")}
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0a0e27] m-0">Shopping Cart</h1>
        <p className="text-sm text-gray-400 mt-1">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Table */}
        <div className="flex-1">
          <Table<Product>
            rowKey={"_id"}
            rowSelection={{ type: "checkbox", ...rowSelection }}
            columns={columns}
            dataSource={tableData}
            loading={isLoading || isFetching}
            pagination={false}
            className="rounded-xl overflow-hidden border border-gray-100"
          />
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-[#f8f8f8] rounded-2xl p-6 sticky top-24">
            <h3 className="text-base font-black text-[#0a0e27] mb-4 uppercase tracking-wide">
              Order Summary
            </h3>
            <Divider className="my-3" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-[#0a0e27]">₹{grandTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">
                  {grandTotal > 999 ? "Free" : "₹99"}
                </span>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex justify-between text-base font-black text-[#0a0e27] mb-6">
              <span>Total</span>
              <span>₹{grandTotal > 999 ? grandTotal : grandTotal + 99}</span>
            </div>
            <Button
              type="primary"
              block
              size="large"
              className="!h-12 !bg-[#0a0e27] !border-[#0a0e27] !rounded-xl !font-bold !text-sm"
            >
              Proceed to Checkout
            </Button>
            <button
              onClick={() => navigate("/home")}
              className="w-full mt-3 text-sm text-gray-500 hover:text-[#0a0e27] transition-colors text-center"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
