import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  selectId: null | number;
}

const initialState: ProductState = {
  selectId: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectId: (state, action: PayloadAction<number | null>) => {
      // const selectID = action.payload;
      // console.log(action.payload, "check");
      // state.selectId = selectID;
      state.selectId = action.payload;
    },
  },
});

export const { setSelectId } = productSlice.actions;

export default productSlice.reducer;
