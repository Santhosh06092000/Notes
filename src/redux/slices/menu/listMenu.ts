import { createSlice } from "@reduxjs/toolkit";
import { IReduxState } from "../../interfaces/IReduxState";
import { IMenuItem } from "../../../components/SideNavBar/ISideNavBar";

export const ListMenu = createSlice({
  name: "ListListMenu",
  initialState: {} as IReduxState<IMenuItem[]>,
  reducers: {
    listMenu: (state) => {
      state.isLoading = true;
    },
    successListMenu: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    failureListMenu: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    clearListMenu: (state) => {
      state.data = {};
    },
  },
});

export const { failureListMenu, listMenu, successListMenu, clearListMenu } =
  ListMenu.actions;

export default ListMenu.reducer;
