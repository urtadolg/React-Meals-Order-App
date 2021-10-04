import MealsList from "./components/Meals/MealsList";
import React, { useState } from "react";
import ReactDom from "react-dom";
import Banner from "./components/Banner/Banner";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const productsData = [
    {
      id: "1",
      title: "Sushi",
      desc: "Finest fish and veggies",
      price: 22.99,
    },
    {
      id: "2",
      title: "Schnitzel",
      desc: "A german spacialty!",
      price: 16.5,
    },
    {
      id: "3",
      title: "Barbecue Burger",
      desc: "American, raw, meaty",
      price: 12.99,
    },
    {
      id: "4",
      title: "Green Bowl",
      desc: "Healthy... and green...",
      price: 18.99,
    },
  ];

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
      <MealsList productsData={productsData} />
    </CartProvider>
  );
}

export default App;
