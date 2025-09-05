import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import { cancelOrder, fetchOrders } from "../redux/slices/ordersSlice";
import toast from "react-hot-toast";

export default function Orders() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.orders);
  const products = useSelector((s) => s.products.items);

  useEffect(() => {
    if (status === "idle") dispatch(fetchOrders());
    if (!products.length) dispatch(fetchProducts());
  }, [dispatch, status, products.length]);

  const onCancel = async (id) => {
    await dispatch(cancelOrder(id));
    dispatch(fetchProducts()); 
    toast.success("Order cancelled succesfully")
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {items.length === 0 ? (
        <div>No orders yet</div>
      ) : (
        <div className="space-y-3">
          {items.map((o) => {
            const prod = products.find((p) => p.id === o.productId) || {};
            return (
              <div key={o.id} className="border p-3 rounded flex items-center justify-between">
                <div>
                  <div className="font-semibold">{prod.name || o.productId}</div>
                  <div className="text-sm text-gray-600 flex gap-3">
                    <p>• Quantity: {o.qty}</p> <p>• Slot: {o.slot}</p> <p>• Delivery: {o.deliveryDate}</p>
                  </div>
                </div>
                <button className="bg-red-500 text-white" onClick={() => onCancel(o.id)}>
                  Cancel
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
