import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateStockBulk } from "../redux/slices/productsSlice";
import toast from "react-hot-toast";
 
export default function OpsPanel() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.products);
  const [local, setLocal] = useState([]);
 
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
 
  useEffect(() => {
    setLocal(items.map((p) => ({ productId: p.id, name: p.name, newStock: p.stock })));
  }, [items]);
 
  // Auto-refresh around 8:03 AM and 6:03 PM
    useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
 
      const between8to805 = hours === 8 && minutes === 3;            
      const inEveningWindow = hours === 18 && minutes == 3;
 
      if (between8to805 || inEveningWindow) {
        dispatch(fetchProducts());
        toast.success("Stock auto-updated with Ops refresh");
      }
    }, 60 * 100);
    return () => clearInterval(interval);
  }, [dispatch]);
 
  const changeStock = (i, val) => {
    const copy = [...local];
    copy[i].newStock = Number(val);
    setLocal(copy);
  };
 
  const submit = async () => {
  try {
    const updates = local.map((l) => ({ productId: l.productId, newStock: l.newStock }));
    await dispatch(updateStockBulk(updates)).unwrap();
    toast.success("Updated stock successfully");
  } catch (err) {
    toast.error(err.message || "Stock update failed");
  }
};
 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Stock - Ops Dashboard</h1>
      <div className="space-y-2 bg-green-200 border p-3 rounded flex flex-col max-w-[500px]">
        {local.map((p, i) => (
          <div key={p.productId} className="flex items-center justify-between gap-3">
            <div className="w-1/2">{p.name}</div>
            <input
              type="number"
              value={p.newStock}
              onChange={(e) => changeStock(i, e.target.value)}
              className="border rounded px-2 py-1 w-32"
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={submit}>
          Stock Update
        </button>
      </div>
    </div>
  );
}
 