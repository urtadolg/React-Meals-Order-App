import React from "react";
const Input = React.forwardRef((props, ref) => {
  return (
    <input
      type={props.type}
      min={props.min}
      max={props.max}
      step={props.step}
      id={props.id}
      defaultValue={props.defaultValue}
      ref={ref}
    />
  );
});

export default Input;
