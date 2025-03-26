import "./SignUp.scss";
import { FunctionComponent } from "react";
import { SignUpProps } from "./ISignUp";
import Card from "../../components/card/Card";
import CardHeader from "../../components/card/CardHeader";
import CardBody from "../../components/card/CardBody";
import Typography from "../../components/Typography/Typography";
import SignUpForm from "./SignUpForm";

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <div className="sign-up">
      <Card>
        <CardHeader>
          <Typography>Signup</Typography>
          {/* <span>...</span> */}
        </CardHeader>
        <CardBody>
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUp;
