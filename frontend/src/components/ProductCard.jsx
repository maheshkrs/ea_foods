import React, { useState } from "react";
import SlotSelector from "./SlotSelector";
import { useDispatch } from "react-redux";
import { computeDeliveryDateForSlot } from "../utils/dateUtils";
import { placeOrder } from "../redux/slices/ordersSlice";
import { fetchProducts } from "../redux/slices/productsSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [slot, setSlot] = useState("Morning");
  const [error, setError] = useState(null);

  const handlePlaceOrder = async () => {
    setError(null);

    if (qty <= 0) return setError("Quantity must be at least 1");
    if (qty > product.stock) return setError("Quantity exceeds available stock");

    const deliveryDate = computeDeliveryDateForSlot();

    const payload = {
      productId: product.id,
      qty,
      slot,
      deliveryDate
    };

    const result = await dispatch(placeOrder(payload));
    if (result.error) {
      setError(result.error.message || "Failed to place order");
    }
    await dispatch(fetchProducts())
    toast.success("Order placed successfully")
  };

  return (
    <div className="border rounded-md p-4 shadow-sm bg-white">
      <h3 className="font-semibold">{product.name}</h3>
      <div className="text-sm text-gray-600">Price: ₹{product.price}</div>
      <div className="mt-2 text-xs">Stock: <strong>{product.stock}</strong></div>

      <div className="mt-3 flex gap-2 items-center">
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
        <SlotSelector value={slot} onChange={setSlot} />
        <button
          className="ml-auto bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={handlePlaceOrder}
          disabled={product.stock <= 0}
        >
          Place Order
        </button>
      </div>

      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </div>
  );
}
