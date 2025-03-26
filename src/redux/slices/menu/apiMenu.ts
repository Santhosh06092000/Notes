import { call, put } from "redux-saga/effects";
import api from "../../axios/middleware";
import { AxiosResponse } from "axios";
import { failureListMenu, successListMenu } from "./listMenu";

const menuApi = () => {
  return api.get("/menu/pages?general_settings=yes");
};

export function* menuList() {
  try {
    const response: AxiosResponse = yield call(menuApi);
    yield put(successListMenu(response.data));
  } catch (error) {
    yield put(failureListMenu(error));
  }
}
