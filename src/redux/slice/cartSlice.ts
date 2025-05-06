import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  count: number;
}

const initialState: CartState = {
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      console.log(action.payload, "count");
      state.count = state.count + 1;
    },

    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const item = action.payload;
      console.log(item, " ch");
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, setCount } = cartSlice.actions;
export default cartSlice.reducer;
