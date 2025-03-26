import "./Card.scss";
import { FunctionComponent, ReactNode } from "react";

interface CardHeaderProps {
  children: ReactNode;
}

const CardHeader: FunctionComponent<CardHeaderProps> = (props) => {
  const { children } = props;
  return <header className="card-header">{children}</header>;
};

export default CardHeader;
