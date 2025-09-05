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
});
