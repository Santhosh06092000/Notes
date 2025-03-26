import "./SignUp.scss";
import { FunctionComponent } from "react";
import Typography from "../../components/Typography/Typography";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "./ISignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextFieldController from "../../components/TextField/TextFieldController";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

interface SignUpFormProps {}

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
  const nav = useNavigate();
  // schema
  const SignUp = z.object({
    email: z
      .string({ message: "Please enter email" })
      .email({ message: "Invalid email address" }),
    password: z.string({ message: "Please enter password" }),
  });

  // form
  const methods = useForm<ISignUp>({
    resolver: zodResolver(SignUp),
  });

  // form submit
  const onSubmit: SubmitHandler<ISignUp> = (val) => {
    console.log(val);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="sign-up-form">
        <Typography variant="h1" weight="medium">
          Register
        </Typography>

        <div className="lable-input">
          <label htmlFor="email">Email</label>
          <TextFieldController name="email" />
        </div>
        <div className="lable-input">
          <label htmlFor="password">Password</label>
          <TextFieldController name="password" type="password" />
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
    </FormProvider>
  );
};

export default SignUpForm;
