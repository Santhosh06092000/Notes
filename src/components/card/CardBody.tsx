import { FunctionComponent, ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CardBody: FunctionComponent<CardBodyProps> = (props) => {
  const { children, className, onClick } = props;
  return (
    <div className={`card-body ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default CardBody;
