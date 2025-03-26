import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReduxState } from "../../interfaces/IReduxState";

export const AddMenuSlice = createSlice({
  name: "AddMenu",
  initialState: {} as IReduxState<{}>,
  reducers: {
    addMenu: (state, _: PayloadAction<{}>) => {
      state.isLoading = true;
    },
    successaddMenu: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    failureaddMenu: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    clearAddMenuResponse: (state) => {
      state.data = {};
    },
  },
});

export const { addMenu, failureaddMenu, successaddMenu, clearAddMenuResponse } =
  AddMenuSlice.actions;

export default AddMenuSlice.reducer;
