import React, { useRef, useContext } from "react";
import styles from "./MealsItem.module.css";
import Button from "../UI/Button";
import MealContext from "../../store/cart-context";
import Input from "./Input";

const MealsItem = (props) => {
  const amountInput = useRef();
  //using context
  const cartCtx = useContext(MealContext);

  //On Submit Handler ---------------------------

  const onSubmitHandler = (event) => {
    event.preventDefault();
    cartCtx.onMealSubmit({
      title: props.title,
      price: props.price,
      qty: +amountInput.current.value,
    });
  };

  /*   meal = {
    title: title,
    price: price,
    qty: qty
  } */

  //---------------------------------------------

  return (
    <div className={styles.mealItemContainer}>
      <section className={styles.title_desc_price}>
        <h1>{props.title}</h1>
        <p>
          <i>{props.desc}</i>
        </p>
        <span className={styles.price}>{`$${props.price.toFixed(2)}`}</span>
      </section>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor={props.title}>Amount</label>
        <Input
          type="number"
          min="1"
          max="10"
          step="1"
          id={props.title}
          defaultValue={1}
          ref={amountInput}
        />
        <Button type="submit" className={styles.btn}>
          + Add
        </Button>
      </form>
    </div>
  );
};

export default MealsItem;
