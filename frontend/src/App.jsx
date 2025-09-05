import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import  Loading  from "./components/Loading";

const Catalog = lazy(() => import("./pages/Catalog"));
const Orders = lazy(() => import("./pages/Orders"));
const OpsPanel = lazy(() => import("./pages/OpsPanel"));
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
    
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/ops" element={<OpsPanel />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
      <Toaster />
    </>
  );
}
