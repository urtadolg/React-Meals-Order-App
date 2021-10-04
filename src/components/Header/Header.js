import styles from "./Header.module.css";
import Cart from "./Cart";

const Header = (props) => {
  return (
    <div className={styles.headerContainer}>
      <span className={styles.logo}>ReactMeals</span>
      <Cart onClick={props.onOpen} />
    </div>
  );
};

export default Header;
