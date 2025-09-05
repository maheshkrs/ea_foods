import { createSelector } from "reselect";

const productsState = (state) => state.products.items || [];
const ordersState = (state) => state.orders.items || [];

export const selectProducts = createSelector([productsState], (products) => products);

export const selectProductById = (id) =>
  createSelector([productsState], (products) => products.find((p) => p.id === id));

export const selectOrders = createSelector([ordersState], (orders) => orders);
