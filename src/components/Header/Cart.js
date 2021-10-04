import styles from "./Cart.module.css";
import Card from "../UI/Card";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    setIsAnimate(true);
    let timeOutIdentifier = setTimeout(() => {
      setIsAnimate(false);
    }, 500);

    return () => {
      clearTimeout(timeOutIdentifier);
    };
  }, [cartCtx.totalQty]);

  return (
    <Card
      className={`${styles.cardContainer} ${isAnimate && styles.effect}`}
      onClick={props.onClick}
    >
      <span>Your Cart</span>
      <Card className={styles.cart}>{cartCtx.totalQty}</Card>
    </Card>
  );
};

export default Cart;
