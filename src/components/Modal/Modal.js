import styles from "./Modal.module.css";
import Card from "../UI/Card";
import { Fragment, useContext } from "react";
import Button from "../UI/Button";
import MealContext from "../../store/cart-context";

const Modal = (props) => {
  const cartCtx = useContext(MealContext);

  //cart example-----------------

  const cart = [
    {
      id: "1",
      title: "Sushi",
      desc: "Finest fish and veggies",
      price: "$22.99",
      qty: 1,
    },
    {
      id: "2",
      title: "Schnitzel",
      desc: "A german spacialty!",
      price: "$16.50",
      qty: 3,
    },
    {
      id: "3",
      title: "Barbecue Burger",
      desc: "American, raw, meaty",
      price: "$12.99",
      qty: 3,
    },
    {
      id: "4",
      title: "Green Bowl",
      desc: "Healthy... and green...",
      price: "$18.99",
      qty: 3,
    },
  ];

  //-----------------------------

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

  return (
    <Fragment>
      <div className={styles.background} onClick={props.onClose}></div>
      <Card className={styles.cartContainer}>
        <div className={styles.cartList}>{cartList}</div>
        <div className={styles.total_amount}>
          <span>Total Amount</span>
          <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
        </div>
        <div className={styles.btn_close_order}>
          <Button className={styles.btnClose} onClick={props.onClose}>
            Close
          </Button>
          <Button className={styles.btnOrder}>Order</Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default Modal;
