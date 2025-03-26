import "./SignIn.scss";
import { FunctionComponent } from "react";
import { SignInProps } from "./ISignIn";
import Card from "../../components/card/Card";
import CardHeader from "../../components/card/CardHeader";
import CardBody from "../../components/card/CardBody";
import Typography from "../../components/Typography/Typography";
import SignInForm from "./SignInForm";

const SignIn: FunctionComponent<SignInProps> = () => {
  return (
    <div className="sign-in">
      <Card>
        <CardHeader>
          <Typography>Login</Typography>
          {/* <span>...</span> */}
        </CardHeader>
        <CardBody>
          <SignInForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
