import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton, message } from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useDeleteCartItem, useGetCartItems, useUpdateCartItem } from "../../../hooks/cartHook";

export const ViewCart = () => {
  const { data, isLoading } = useGetCartItems();
  const useDelete = useDeleteCartItem();
  const useUpdate = useUpdateCartItem();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const cartItems = data?.cartItems || [];
  const subTotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.productId?.price * item.quantity || 0),
    0
  );

  const handleDelete = async (itemId: string) => {
    try {
      await useDelete.mutateAsync(itemId);
      message.success("Item removed from cart");
    } catch {
      message.error("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (itemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    setUpdatingId(itemId);
    try {
      await useUpdate.mutateAsync({ itemId, quantity: newQuantity });
    } catch {
      message.error("Could not update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  const getProductLink = (product: any) => {
    const identifier = product?.slug || product?._id;
    return identifier ? `/products/${identifier}` : "#";
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-12 py-12 min-h-screen">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-12 min-h-[70vh] flex justify-center items-center">
        <div className="text-center border border-gray-200 p-16 max-w-md w-full">
          <ShoppingOutlined className="text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Libre_Baskerville']">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-8">You haven't added anything yet.</p>
          <Link
            to="/home"
            className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-semibold font-['Libre_Baskerville'] hover:bg-gray-700 transition-colors no-underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 font-['Libre_Baskerville']">
      <div className="max-w-5xl mx-auto px-4 sm:px-12">

        {/* Page title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Cart
          <span className="ml-3 text-base font-normal text-gray-400">
            ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
          </span>
        </h1>

        <div className="flex flex-col xl:flex-row gap-8 items-start">

          {/* Cart items list */}
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map((item: any) => {
              const product = item.productId;
              const isUpdating = updatingId === item._id;

              return (
                <div
                  key={item._id}
                  className="flex gap-5 border border-gray-200 p-5 bg-white"
                >
                  {/* Image */}
                  <Link
                    to={getProductLink(product)}
                    state={{ color: item.variants?.color, size: item.variants?.size }}
                    className="flex-shrink-0"
                  >
                    <div className="w-32 h-36 bg-gray-100 overflow-hidden">
                      {product?.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          to={getProductLink(product)}
                          state={{ color: item.variants?.color, size: item.variants?.size }}
                          className="no-underline"
                        >
                          <h3 className="text-base font-bold text-gray-900 hover:text-gray-600 transition-colors mb-1">
                            {product?.name || "Unknown Product"}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-1">{product?.brand || "—"}</p>
                        <p className="text-base font-semibold text-gray-900">
                          ${product?.price?.toFixed(2) || "0.00"}
                        </p>

                        {/* Variants */}
                        <div className="mt-2 flex gap-4 text-sm text-gray-500">
                          {item.variants?.size && (
                            <span>Size : <span className="text-gray-800 font-medium">{item.variants.size}</span></span>
                          )}
                          {item.variants?.color?.name && (
                            <span className="flex items-center gap-1">
                              Color :
                              <span
                                className="inline-block w-4 h-4 border border-gray-300"
                                style={{ backgroundColor: item.variants.color.hex }}
                              />
                              <span className="text-gray-800 font-medium">{item.variants.color.name}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Subtotal</p>
                        <p className="text-base font-bold text-gray-900">
                          ${((product?.price || 0) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className={`inline-flex items-center border border-gray-300 ${isUpdating ? "opacity-50 pointer-events-none" : ""}`}>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
                        >
                          <MinusOutlined className="text-[10px]" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border-l border-gray-300"
                        >
                          <PlusOutlined className="text-[10px]" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={useDelete.isPending}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <DeleteOutlined />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="w-full xl:w-72 flex-shrink-0 border border-gray-200 p-6 sticky top-[90px]">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900 font-medium">${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-gray-900 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-b border-gray-200 mb-6">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">${subTotal.toFixed(2)}</span>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 text-sm font-semibold hover:bg-gray-700 transition-colors mb-3">
              Checkout
            </button>

            <Link to="/home">
              <button className="w-full border border-gray-300 text-gray-700 py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};