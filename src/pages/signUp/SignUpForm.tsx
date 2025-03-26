import "./SignUp.scss";
import { FunctionComponent, useState } from "react";
import Typography from "../../components/Typography/Typography";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "./ISignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextFieldController from "../../components/TextField/TextFieldController";
import { Alert, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../auth/user_auth";

interface SignUpFormProps {}

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  // signup api
  const signupMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // localStorage.setItem("token", data.token); // Store token
      nav("/sign-in"); // Redirect on success
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // alert("Invalid email or password");
      setOpen(true);
    },
  });

  // schema
  const SignUp = z
    .object({
      user_name: z.string({ message: "Please enter User Name" }),
      user_email: z
        .string({ message: "Please enter email" })
        .email({ message: "Invalid email address" }),
      password: z.string({ message: "Please enter password" }),
      conform_password: z
        .string({ message: "Please enter confirm password" })
        .optional(),
    })
    .refine((data) => data.password === data.conform_password, {
      message: "Passwords don't match",
      path: ["conform_password"],
    });

  // form
  const methods = useForm<ISignUp>({
    resolver: zodResolver(SignUp),
  });

  // form submit
  const onSubmit: SubmitHandler<ISignUp> = (val) => {
    const { conform_password, ...rest } = val;
    signupMutation.mutate(rest);
    console.log(val);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="sign-up-form">
        <Typography variant="h1" weight="medium">
          Sign Up
        </Typography>

        <div className="lable-input">
          <label htmlFor="user_name">User Name</label>
          <TextFieldController name="user_name" />
        </div>
        <div className="lable-input">
          <label htmlFor="user_email">Email</label>
          <TextFieldController name="user_email" />
        </div>
        <div className="lable-input">
          <label htmlFor="password">Password</label>
          <TextFieldController name="password" type="password" />
        </div>
        <div className="lable-input">
          <label htmlFor="conform_password">Confirm Password</label>
          <TextFieldController name="conform_password" type="password" />
        </div>

        <div className="sign-up-form-actions">
          <Button type="submit" variant="contained" color="success">
            Register
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => nav("/sign-in")}
          >
            Login
          </Button>
        </div>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        // action={action}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Email already exists.
        </Alert>
      </Snackbar>
    </FormProvider>
  );
};

export default SignUpForm;
