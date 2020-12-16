import React from "react";

import { ExampleProps } from "./interfaces";

export const Example: React.FC<ExampleProps> = ({
  children,
  ...restProps
}): JSX.Element => {
  return <button {...restProps}>{children}</button>;
};
