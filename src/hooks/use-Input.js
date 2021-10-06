import { useState } from "react";

const useInput = (validationInputfunction) => {
  const [userInputValue, setUserInputValue] = useState("");
  const [inputIsThouched, setInputIsTouched] = useState(false);

  let isValid = validationInputfunction(userInputValue);
  let hasError = !isValid && inputIsThouched;

  const onChangeHandler = (event) => {
    event.preventDefault();
    setUserInputValue(event.target.value);
  };

  const onBlurHandler = () => {
    setInputIsTouched(true);
  };

  const reset = () => {
    setUserInputValue("");
    setInputIsTouched(false);
  };

  return {
    userInputValue,
    isValid,
    hasError,
    onChangeHandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;
