import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Skeleton, message } from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useDeleteCartItem, useGetCartItems, useUpdateCartItem } from "../../../hooks/cartHook";

export const ViewCart = () => {
  const { data, isLoading, isFetching } = useGetCartItems();
  const useDelete = useDeleteCartItem();
  const useUpdate = useUpdateCartItem();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const cartItems = data?.cartItems || [];
  const subTotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.productId?.price * item.quantity || 0),
    0
  );
  const total = subTotal;

  const handleDelete = async (itemId: string) => {
    try {
      await useDelete.mutateAsync(itemId);
      message.success("Item removed from cart");
    } catch (error) {
      message.error("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (itemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    setUpdatingId(itemId);
    try {
      await useUpdate.mutateAsync({ itemId, quantity: newQuantity });
    } catch (error) {
      message.error("Could not update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-16 bg-gray-50/50 min-h-screen">
        <h1 className="text-4xl font-extrabold mb-10 font-['Libre_Baskerville'] text-primary">Shopping Bag</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-16">
          <div className="xl:col-span-2 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white shadow-sm border border-gray-100">
                <Skeleton.Image className="!w-32 !h-32 rounded-2xl" active />
                <div className="flex-1 py-2">
                  <Skeleton active paragraph={{ rows: 2, width: ['60%', '40%'] }} title={{ width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
              <Skeleton active paragraph={{ rows: 6 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-32 flex justify-center min-h-[70vh] items-center">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-50 max-w-lg w-full">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingOutlined className="text-4xl text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 font-['Libre_Baskerville']">Your bag is empty</h2>
          <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything yet.</p>
          <Link to="/home">
            <Button 
              type="primary" 
              size="large" 
              className="h-14 px-10 rounded-full !bg-primary hover:!bg-primaryHover !font-semibold text-lg transition-all duration-300 shadow-xl shadow-primary/20"
            >
              Discover Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 font-sans selection:bg-[#1890ff] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12 lg:py-16">
        <div className="flex items-baseline justify-between mb-10 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-extrabold font-['Libre_Baskerville'] text-primary tracking-tight">Shopping Bag</h1>
          <p className="text-lg font-medium text-gray-500 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </p>
        </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-16 items-start">
        {/* Cart Items List */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {cartItems.map((item: any) => {
            const product = item.productId;
            const isUpdating = updatingId === item._id;

            return (
              <div
                key={item._id}
                className={`flex flex-col sm:flex-row gap-6 lg:gap-8 p-6 lg:p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group ${
                  isUpdating || useDelete.isPending || useUpdate.isPending ? "opacity-50 pointer-events-none scale-[0.99]" : "opacity-100"
                }`}
              >
                {/* Product Image */}
                <div className="w-full sm:w-40 sm:h-40 flex-shrink-0 bg-[#f8f9fa] rounded-2xl overflow-hidden flex items-center justify-center relative">
                  {product?.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                  )}
                  {/* Decorative faint background circle */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent mix-blend-overlay"></div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <Link to={`/products/${product?.slug || product?._id}`} className="hover:text-accent transition-colors">
                        <h3 className="text-xl lg:text-2xl font-bold text-primary leading-tight pr-4">
                          {product?.name || "Unknown Product"}
                        </h3>
                      </Link>
                      <p className="text-xl lg:text-2xl font-extrabold text-primary flex-shrink-0 tracking-tight">
                        ${product?.price?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                      {product?.brand || "Premium Collection"}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 border-t border-gray-50 pt-6">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-[#f8f9fa] rounded-full p-1 border border-gray-200">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        <MinusOutlined className="text-xs" />
                      </button>
                      <div className="w-12 text-center text-base font-bold text-primary">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all hover:text-accent"
                      >
                        <PlusOutlined className="text-xs" />
                      </button>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-full transition-all flex items-center gap-2 text-sm font-bold group/btn"
                    >
                      <DeleteOutlined className="group-hover/btn:scale-110 transition-transform" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-[2rem] p-8 lg:p-10 sticky top-[100px] shadow-2xl shadow-gray-200/50 border border-gray-100">
            <h2 className="text-2xl font-extrabold text-primary mb-8 font-['Libre_Baskerville']">Order Summary</h2>

            <div className="space-y-5 text-base">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span className="text-primary">${subTotal.toFixed(2)}</span>
              </div>
            </div>

            <Divider className="my-8 border-gray-100" dashed />

            <div className="flex justify-between items-end mb-10">
              <span className="text-lg font-bold text-primary">Total</span>
              <div className="text-right">
                <span className="block text-sm text-gray-400 mb-1">USD</span>
                <span className="text-4xl font-extrabold text-primary tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              block
              className="h-16 rounded-2xl !bg-primary hover:!bg-primaryHover !text-lg !font-bold shadow-xl shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
