/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

export const CustomInput = React.forwardRef<HTMLInputElement, any>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className="w-full p-2 text-sm rounded-md bg-white border-none focus:outline-none"
      />
    );
  }
);
CustomInput.displayName = "CustomPhoneInput";
