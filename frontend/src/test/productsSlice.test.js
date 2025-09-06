/* eslint-env vitest */
import { describe, it, expect } from "vitest";
import productsReducer, { fetchProducts } from "../redux/slices/productsSlice";

describe("productsSlice", () => {
  it("should handle initial state", () => {
    const state = productsReducer(undefined, { type: "unknown" });
    expect(state.items).toEqual([]);
    expect(state.status).toBe("idle");
  });

  it("should handle fetchProducts.pending", () => {
    const state = productsReducer(undefined, fetchProducts.pending()); 
    expect(state.status).toBe("loading");
  });

  it("should handle fetchProducts.fulfilled", () => {
    const products = [{ id: 1, name: "Apple", stock: 5 }];
    const state = productsReducer(undefined, fetchProducts.fulfilled(products));
    expect(state.items).toEqual(products);
    expect(state.status).toBe("succeeded");
  });
  it("should handle updateStockBulk.fulfilled", () => {
    const initialState = {
      items: [
        { id: 1, name: "Apple", stock: 5 },
        { id: 2, name: "Banana", stock: 10 }
      ],
      status: "idle"
    };
    const updates = [
      { productId: 1, newStock: 15 },
      { productId: 2, newStock: 20 }
    ];
    const action = {
      type: "products/updateStockBulk/fulfilled",
      payload: { updates }
    };
    const state = productsReducer(initialState, action);
    expect(state.items).toEqual([
      { id: 1, name: "Apple", stock: 15 },
      { id: 2, name: "Banana", stock: 20 }
    ]);
  });
});
