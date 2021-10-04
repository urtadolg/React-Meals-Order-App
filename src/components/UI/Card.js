import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <section
      className={`${styles.card} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </section>
  );
};

export default Card;
