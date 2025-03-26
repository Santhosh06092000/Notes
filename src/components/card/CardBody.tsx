import { FunctionComponent, ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
}

const CardBody: FunctionComponent<CardBodyProps> = (props) => {
  const { children } = props;
  return <div className="card-body">{children}</div>;
};

export default CardBody;
