import MealsList from "./components/Meals/MealsList";
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Banner from "./components/Banner/Banner";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import CartProvider from "./store/CartProvider";
import Styles from "./App.module.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://react-http-first-app-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Unable to load meals.");
      }

      const convertedResponse = await response.json();

      const mealsData = [];

      for (const key in convertedResponse) {
        mealsData.push({
          id: key,
          title: convertedResponse[key].title,
          desc: convertedResponse[key].description,
          price: convertedResponse[key].price,
        });
      }

      setMeals(mealsData);
      setIsLoading(false);
    }

    fetchData().catch((error) => {
      setIsLoading(false);
      setHasError(error.message);
    });
  }, []);

  const onCloseHandler = () => {
    setCartOpen(false);
  };
  const onOpenHandler = () => {
    setCartOpen(true);
  };

  return (
    <CartProvider>
      {cartOpen &&
        ReactDom.createPortal(
          <Modal onClose={onCloseHandler} />,
          document.getElementById("modal")
        )}
      <Header onOpen={onOpenHandler} />
      <Banner />
      {!isLoading && !hasError && <MealsList productsData={meals} />}
      {isLoading && (
        <section>
          <p className={Styles.loading_text}>Loading...</p>
        </section>
      )}
      {hasError && (
        <section>
          <p className={Styles.error_text}>{hasError}</p>
        </section>
      )}
    </CartProvider>
  );
}

export default App;
