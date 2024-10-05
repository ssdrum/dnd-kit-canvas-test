import React from "react";

interface Props {
  children: React.ReactNode;
  center?: boolean;
  style?: React.CSSProperties;
}

export function Wrapper({ children, style }: Props) {
  return (
    <div className="wrapper" style={style}>
      {children}
    </div>
  );
}
