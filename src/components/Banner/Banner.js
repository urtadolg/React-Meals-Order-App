import styles from "./Banner.module.css";
import Card from "../UI/Card";

const Title = (props) => {
  return (
    <Card className={styles.card}>
      <h1 className={styles.h1}>Delicious Food, Delivered To You</h1>
      <p className={styles.p}>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p className={styles.p}>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experiented chefs!
      </p>
    </Card>
  );
};

export default Title;
