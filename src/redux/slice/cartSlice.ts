import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/ProductType";

// Payload for identifying a specific item to remove or update
interface CartItemIdentifier {
  productId: number;
  sku: string;
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
      const newItemDetails = action.payload;
      console.log(newItemDetails, " info of cart product action.payload");

      // const item = action.payload;
      // console.log(item, " info of cart product action.payload");
      // const existing = state.items.find((i) => i.productId === item.productId);
      // const sku = state.items.find((s) => s.sku === item.sku);
      // if (existing && sku) {
      //   existing.quantity += 1;
      // } else {
      //   state.items.push({ ...item, quantity: 1 });
      // }

      //  Find if the exact item (same product ID and SKU) already exists in the cart
      const existingItem = state.items.find(
        (item) =>
          item.productId === newItemDetails.productId &&
          item.sku === newItemDetails.sku
      );

      if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ ...newItemDetails, quantity: 1 });
      }
    },

    // removeFromCart: (state, action: PayloadAction<number>) => {
    //   state.items = state.items.filter((i) => i.productId !== action.payload);
    // },

    removeFromCart: (state, action: PayloadAction<CartItemIdentifier>) => {
      const { productId, sku } = action.payload;
      console.log("removeFromCart action.payload:", { productId, sku });
      // Filter out the item that matches both productId and sku
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.sku === sku)
      );
    },
  },
});

export const { addToCart, removeFromCart, setCount } = cartSlice.actions;
export default cartSlice.reducer;
