import { ISignIn } from "../pages/signIn/ISignIn";
import { ISignUp } from "../pages/signUp/ISignUp";
import api from "../redux/axios/middleware";

export const signUpUser = async (data: ISignUp): Promise<ISignUp[]> => {
  const response = await api.post("/register/", data);
  return response.data;
};

export const signInUser = async (data: ISignIn): Promise<ISignIn[]> => {
  const response = await api.post("/login/", null, { params: data });
  return response.data;
};
