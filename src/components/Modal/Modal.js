import styles from "./Modal.module.css";
import Card from "../UI/Card";
import { Fragment, useContext, useState } from "react";
import Button from "../UI/Button";
import MealContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Modal = (props) => {
  const cartCtx = useContext(MealContext);
  const [onCheckout, setOnCheckout] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  // on Add Handler
  const onAddHandler = (item) => {
    // enviado para CartProvider
    /* item = {
      title: '',
      price: 0,
      qty: 0,
    } */
    cartCtx.onAddSubmit(item);
  };

  //on Remove Handler
  const onRemoveHandler = (itemId) => {
    //enviado para CartProvider.js
    //itemId = item.title
    cartCtx.onRemoveSubmit(itemId);
  };

  // Component Meal Item ---------------------------------

  const MealItem = (props) => {
    return (
      <div className={styles.itemContainer}>
        <div className={styles.title_price_qty_Container}>
          <span className={styles.title}>{props.title}</span>
          <span className={styles.price}>{props.price}</span>
          <span className={styles.qty}>{`x${props.qty}`}</span>
        </div>
        <div className={styles.add_remove_Container}>
          <div className={styles.add} onClick={props.onAdd}>
            +
          </div>
          <div className={styles.remove} onClick={props.onRemove}>
            -
          </div>
        </div>
      </div>
    );
  };

  //----------------------------------------------------------

  const cartList = cartCtx.items.map((item) => {
    return (
      <MealItem
        key={item.title}
        title={item.title}
        price={item.price}
        qty={item.qty}
        onAdd={onAddHandler.bind(null, item)}
        onRemove={onRemoveHandler.bind(null, item.title)}
      />
    );
  });

  const onOrderHandler = () => {
    setOnCheckout(true);
  };

  const onConfirmHandler = async (userData) => {
    setIsOrdering(true);
    await fetch(
      "https://react-http-first-app-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsOrdering(false);
    setIsOrdered(true);
    cartCtx.onClearCart();
  };

  const modal = (
    <Fragment>
      <div className={styles.background} onClick={props.onClose}></div>
      <Card className={styles.cartContainer}>
        <div className={styles.cartList}>{cartList}</div>
        <div className={styles.total_amount}>
          <span>Total Amount</span>
          <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
        </div>
        {onCheckout && (
          <Checkout onClick={props.onClose} onConfirm={onConfirmHandler} />
        )}
        {!onCheckout && (
          <div className={styles.btn_close_order}>
            <Button className={styles.btnClose} onClick={props.onClose}>
              Close
            </Button>
            <Button className={styles.btnOrder} onClick={onOrderHandler}>
              Order
            </Button>
          </div>
        )}
      </Card>
    </Fragment>
  );

  const ordering = <p>Please wait...</p>;

  const ordered = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <br />
      <Button className={styles.btnClose} onClick={props.onClose}>
        Close
      </Button>
    </Fragment>
  );

  return (
    <Fragment>
      <div className={styles.background} onClick={props.onClose}></div>
      <Card className={styles.cartContainer}>
        {!isOrdering && !isOrdered && modal}
        {isOrdering && !isOrdered && ordering}
        {!isOrdering && isOrdered && ordered}
      </Card>
    </Fragment>
  );
};

export default Modal;
