import { ISignUp } from "../signUp/ISignUp";

export interface SignInProps {}

export interface ISignIn {
  user_email: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: ISignUp;
}
