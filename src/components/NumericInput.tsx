import { ChangeEventHandler, useState } from "react";

type NumericInputProps = {
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className: string;
};

export default function ({ value, onChange, className }: NumericInputProps) {
  let classes = `numeric-input ${className ? className : ""}`;
  return (
    <input
      className={classes}
      type="number"
      value={value}
      onChange={onChange}
    />
  );
}
