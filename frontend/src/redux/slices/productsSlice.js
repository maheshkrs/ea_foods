import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPatch, apiPost } from "../../api/apiClient";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await apiGet("/products");
});

export const updateStock = createAsyncThunk(
  "products/updateStock",
  async ({ productId, newStock }) => {
    return await apiPatch(`/products/${productId}`, { stock: newStock });
  }
);

export const updateStockBulk = createAsyncThunk(
  "products/updateStockBulk",
  async (updates) => {
    return await apiPost("/ops/update-stock", { updates });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx > -1) state.items[idx] = action.payload;
      })
      .addCase(updateStockBulk.fulfilled, (state, action) => {
        action.payload.updates.forEach((u) => {
          const p = state.items.find((x) => x.id === u.productId);
          if (p) p.stock = u.newStock;
        });
      });
  }
});

export default productsSlice.reducer;
