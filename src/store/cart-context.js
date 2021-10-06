import React from "react";
const MealContext = React.createContext({
  items: [],
  totalAmount: 0,
  qty: 0,
  onMealSubmit: () => {},
  onAddSubmit: () => {},
  onRemoveSubmit: () => {},
  onClearCart: () => {},
});

export default MealContext;
