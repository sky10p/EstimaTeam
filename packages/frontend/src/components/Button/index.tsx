import React from "react";
import "./Button.css";

export type ButtonProps = {
  onClick?: () => void;
  textButton: string;
};
export const Button: React.FC<ButtonProps> = ({ textButton, onClick }) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleOnClick} type="button">
      {textButton}
    </button>
  );
};
