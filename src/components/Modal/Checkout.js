import Styles from "./Checkout.module.css";
import Button from "../UI/Button";
import useInput from "../../hooks/use-Input";

const Checkout = (props) => {
  const nameValidationHandler = (value) => {
    return value.trim() !== "";
  };
  const streetValidationHandler = (value) => {
    return value.trim() !== "";
  };
  const postalValidationHandler = (value) => {
    return value.trim() !== "" && value.trim().length >= 8;
  };
  const cityValidationHandler = (value) => {
    return value.trim() !== "";
  };

  const {
    userInputValue: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: nameOnChangeHandler,
    onBlurHandler: nameOnBlurHandler,
    reset: nameReset,
  } = useInput(nameValidationHandler);
  const {
    userInputValue: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    onChangeHandler: streetOnChangeHandler,
    onBlurHandler: streetOnBlurHandler,
    reset: streetReset,
  } = useInput(streetValidationHandler);
  const {
    userInputValue: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    onChangeHandler: postalOnChangeHandler,
    onBlurHandler: postalOnBlurHandler,
    reset: postalReset,
  } = useInput(postalValidationHandler);
  const {
    userInputValue: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    onChangeHandler: cityOnChangeHandler,
    onBlurHandler: cityOnBlurHandler,
    reset: cityReset,
  } = useInput(cityValidationHandler);

  //form validation
  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(nameValue);
    nameReset();
    streetReset();
    postalReset();
    cityReset();

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postalValue,
      city: cityValue,
    });
  };

  const nameClasses = nameHasError ? `${Styles.error_input}` : "";
  const streetClasses = streetHasError ? `${Styles.error_input}` : "";
  const postalClasses = postalHasError ? `${Styles.error_input}` : "";
  const cityClasses = cityHasError ? `${Styles.error_input}` : "";

  return (
    <form className={Styles.form} onSubmit={onSubmitHandler}>
      <div className={Styles.input}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          onChange={nameOnChangeHandler}
          onBlur={nameOnBlurHandler}
          className={nameClasses}
          value={nameValue}
        />
        {nameHasError && (
          <p className={Styles.error_text}>Name must not be empty.</p>
        )}
      </div>
      <div className={Styles.input}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          onChange={streetOnChangeHandler}
          onBlur={streetOnBlurHandler}
          className={streetClasses}
          value={streetValue}
        />
        {streetHasError && (
          <p className={Styles.error_text}>Street must not be empty.</p>
        )}
      </div>
      <div className={Styles.input}>
        <label htmlFor="postal">Postal Code</label>
        <input
          id="postal"
          type="text"
          onChange={postalOnChangeHandler}
          onBlur={postalOnBlurHandler}
          className={postalClasses}
          value={postalValue}
        />
        {postalHasError && (
          <p className={Styles.error_text}>
            Postal Code must not be empty and minimum of 10 characters.
          </p>
        )}
      </div>
      <div className={Styles.input}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          onChange={cityOnChangeHandler}
          onBlur={cityOnBlurHandler}
          className={cityClasses}
          value={cityValue}
        />
        {cityHasError && (
          <p className={Styles.error_text}>City must not be empty.</p>
        )}
      </div>
      <div className={Styles.buttons}>
        <Button
          className={Styles.cancelButton}
          type="button"
          onClick={props.onClick}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!formIsValid}>
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default Checkout;
