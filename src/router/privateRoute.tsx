import { FunctionComponent, ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = (props) => {
  const { children } = props;

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
