import React from "react";

const Button = (props) => {
  return (
    <button
      className={props.className}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      onChange={props.onChange}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
