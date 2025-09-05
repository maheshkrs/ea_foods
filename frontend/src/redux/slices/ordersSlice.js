import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiDelete } from "../../api/apiClient";

export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  return await apiGet("/orders");
});

export const placeOrder = createAsyncThunk(
  "orders/place",
  async (payload, { rejectWithValue }) => {
    try {
      return await apiPost("/orders", payload);
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancel",
  async (orderId, { rejectWithValue }) => {
    try {
      await apiDelete(`/orders/${orderId}`);
      return { orderId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((o) => o.id !== action.payload.orderId);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default ordersSlice.reducer;
