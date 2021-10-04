import MealsItem from "./MealsItem";
import styles from "./MealsList.module.css";
import Card from "../UI/Card";
import React from "react";

const MealsList = (props) => {
  return (
    <Card className={styles.card}>
      {props.productsData.map((meal) => {
        return (
          <MealsItem
            key={meal.id}
            title={meal.title}
            desc={meal.desc}
            price={meal.price}
          />
        );
      })}
    </Card>
  );
};

export default MealsList;
