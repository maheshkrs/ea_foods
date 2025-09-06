import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productsSlice";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
 
export default function Catalog() {
  const dispatch = useDispatch();
  const { items=[], status } = useSelector((s) => s.products);
 
  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);
 
 
  // Auto-refresh around 8:00 AM and 6:00 PM
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
 
 
  return ( status === "loading" ? <Loading /> :
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}