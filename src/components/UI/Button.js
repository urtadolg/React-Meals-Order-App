import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={`${styles.btn} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.children}
    </button>
  );
};

export default Button;
