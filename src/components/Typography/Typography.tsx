import "./Typography.scss";
import { TTypography } from "./ITypography";
import React, { FunctionComponent, ReactNode } from "react";

interface TypographyProps {
  variant?: TTypography;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  weight?: "medium" | "semi bold";
}

const Typography: FunctionComponent<TypographyProps> = (props) => {
  const { variant = "p2", children, style, className = "", weight } = props;
  let fontWeight;
  switch (weight) {
    case "medium":
      fontWeight = 600;
      break;
    case "semi bold":
      fontWeight = 500;
      break;

    default:
      fontWeight = 400;
      break;
  }
  return (
    <div
      className={`${variant} ${className}`}
      style={{ ...style, fontWeight: fontWeight }}
    >
      {children}
    </div>
  );
};

export default Typography;
