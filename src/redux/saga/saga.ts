import { menuList } from "../slices/menu/apiMenu";
import { takeLatest } from "redux-saga/effects";

export default function* rootSage() {
  yield takeLatest("ListListMenu/listMenu", menuList);
}
