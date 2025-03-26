import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReduxState } from "../../interfaces/IReduxState";

export const EditMenuSlice = createSlice({
  name: "EditMenu",
  initialState: {} as IReduxState<{}>,
  reducers: {
    editMenu: (state, _: PayloadAction<{}>) => {
      state.isLoading = true;
    },
    successeditMenu: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    failureeditMenu: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    clearEditMenuResponse: (state) => {
      state.data = {};
    },
  },
});

export const {
  editMenu,
  failureeditMenu,
  successeditMenu,
  clearEditMenuResponse,
} = EditMenuSlice.actions;

export default EditMenuSlice.reducer;
