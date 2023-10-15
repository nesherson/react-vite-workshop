import { MouseEventHandler } from "react";

type CustomButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string | undefined;
};

export default function ({ text, onClick, className }: CustomButtonProps) {
  let classes = `btn ${className ? className : ""}`;

  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
}
