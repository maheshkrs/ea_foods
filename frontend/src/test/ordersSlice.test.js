/* eslint-env vitest */
import { describe, it, expect } from "vitest";
import ordersReducer, { fetchOrders } from "../redux/slices/ordersSlice";

describe("ordersSlice", () => {
  it("should handle initial state", () => {
    const state = ordersReducer(undefined, { type: "unknown" });
    expect(state.items).toEqual([]);
    expect(state.status).toBe("idle");
  });

  it("should handle fetchOrders.fulfilled", () => {
    const orders = [{ id: 1, productId: 2, qty: 3 }];
    const state = ordersReducer(undefined, fetchOrders.fulfilled(orders));
    expect(state.items).toEqual(orders);
    expect(state.status).toBe("succeeded");
  });
});
