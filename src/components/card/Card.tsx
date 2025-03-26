import "./Card.scss";
import { FunctionComponent } from "react";
import { CardProps } from "./ICard";

const Card: FunctionComponent<CardProps> = (props) => {
  const { children } = props;
  return <div className="card">{children}</div>;
};

export default Card;
