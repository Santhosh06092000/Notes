import "./SignIn.scss";
import { FunctionComponent } from "react";
import Typography from "../../components/Typography/Typography";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ISignIn } from "./ISignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextFieldController from "../../components/TextField/TextFieldController";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { signInUser } from "../../auth/user_auth";
import { useMutation } from "@tanstack/react-query";

interface SignInFormProps {}

const SignInForm: FunctionComponent<SignInFormProps> = () => {
  const nav = useNavigate();
  // signin api
  const signinMutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // localStorage.setItem("token", data.token); // Store token
      nav("/"); // Redirect on success
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    },
  });
  // schema
  const signIn = z.object({
    user_email: z
      .string({ message: "Please enter email" })
      .email({ message: "Invalid email address" }),
    password: z.string({ message: "Please enter password" }),
  });

  // form
  const methods = useForm<ISignIn>({
    resolver: zodResolver(signIn),
  });

  // form submit
  const onSubmit: SubmitHandler<ISignIn> = (val) => {
    signinMutation.mutate(val);
    console.log(val);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="sign-in-form">
        <Typography variant="h1" weight="medium">
          Login
        </Typography>

        <div className="lable-input">
          <label htmlFor="user_email">Email</label>
          <TextFieldController name="user_email" />
        </div>
        <div className="lable-input">
          <label htmlFor="password">Password</label>
          <TextFieldController name="password" type="password" />
        </div>

        <div className="sign-in-form-actions">
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => nav("/sign-up")}
          >
            Register
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignInForm;
