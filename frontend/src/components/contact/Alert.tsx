import React from "react";
const Alert = ({ children }: { children: any }) => {
  return <div className="text-center text-red-500 font-bold">{children}</div>;
};

export default Alert;
