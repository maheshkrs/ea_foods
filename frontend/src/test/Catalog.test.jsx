import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/slices/productsSlice";
import Catalog from "../pages/Catalog";

function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: { products: productsReducer },
    preloadedState
  });
  return render(
    <Provider store={store}>
      <Catalog />
    </Provider>
  );
}

describe("Catalog page", () => {
  it("renders products from Redux store", () => {
    renderWithStore({
      products: {
        items: [{ id: 1, name: "Apple", price: 10, stock: 5 }],
        status: "succeeded",
        error: null
      }
    });
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    renderWithStore({
      products: {
        items: [],
        status: "loading",
        error: null
      }
    });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
