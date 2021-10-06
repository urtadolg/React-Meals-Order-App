import MealContext from "./cart-context";
import { useReducer } from "react";

const reducerFunction = (state, action) => {
  if (action.type === "MEAL_ADDED") {
    /*  action.meal = {
    title: title,
    price: price,
    qty: qty
  } */

    /*    state = {
      items: [],
      totalAmount: 0,
      totalQty: 0
    }; */

    /*  state.items = [
      {...meal},
      {...meal},
      {...meal},
      ...
  ] */

    //looking for action.meal on items array
    let repeatedMealIndex = state.items.findIndex(
      (item) => item.title === action.meal.title
    ); //item = {...meal}

    if (repeatedMealIndex === -1) {
      const itemsUpdated = state.items.concat([action.meal]);
      const totalAmountUpdated = itemsUpdated.reduce(
        (currentValue, newValue) => {
          return currentValue + newValue.price * newValue.qty;
        },
        0
      );
      const totalQtyUpdated = itemsUpdated.reduce((currentValue, newValue) => {
        return currentValue + newValue.qty;
      }, 0);
      return {
        items: itemsUpdated,
        totalAmount: totalAmountUpdated,
        totalQty: totalQtyUpdated,
      };
    } else {
      //if there is already an item

      const repeatedItem = state.items[repeatedMealIndex];
      repeatedItem.qty += action.meal.qty;

      const itemsUpdated = state.items
        .filter((item) => {
          return item.title !== action.meal.title;
        })
        .concat(repeatedItem);
      const totalAmountUpdated = itemsUpdated.reduce(
        (currentValue, newValue) => {
          return currentValue + newValue.price * newValue.qty;
        },
        0
      );

      const totalQtyUpdated = itemsUpdated.reduce((currentValue, newValue) => {
        return currentValue + newValue.qty;
      }, 0);

      return {
        items: itemsUpdated,
        totalAmount: totalAmountUpdated,
        totalQty: totalQtyUpdated,
      };
    }
  }

  if (action.type === "ADD_MEAL") {
    //finding index of the action.mealAdded on state.items list
    const mealAddedIndex = state.items.findIndex((item) => {
      return item.title === action.mealAdded.title;
    });

    //updating the found item qty
    const itemFound = state.items[mealAddedIndex];
    itemFound.qty += 1;

    //replacing old item with itemFound (qty updated) from state.items
    state.items.splice(mealAddedIndex, 1, itemFound);

    const itemsUpdated = state.items;

    const totalAmountUpdated = itemsUpdated.reduce((currentValue, newValue) => {
      return currentValue + newValue.price * newValue.qty;
    }, 0);

    const totalQtyUpdated = itemsUpdated.reduce((currentValue, newValue) => {
      return currentValue + newValue.qty;
    }, 0);

    return {
      items: itemsUpdated,
      totalAmount: totalAmountUpdated,
      totalQty: totalQtyUpdated,
    };
  }

  if (action.type === "REMOVE_MEAL") {
    /* action.mealRemovedId = item.title;


  /*    state = {
      items: [],
      totalAmount: 0,
      totalQty: 0
    }; */
    /*  state.items = [
      {...meal},
      {...meal},
      {...meal},
      ...
  ] */

    //finding index of item removed pressed
    const removedItemIndex = state.items.findIndex((item) => {
      return item.title === action.mealRemovedId;
    });
    const removedItem = state.items[removedItemIndex];
    let itemsUpdated = [];
    //checking if removed item qty is 1 or more than 1
    if (removedItem.qty > 1) {
      //only subtract 1 from qty
      removedItem.qty -= 1;

      //updating state.items
      state.items.splice(removedItemIndex, 1, removedItem);
      itemsUpdated = state.items;
    } else {
      //completely remove item from state.items

      itemsUpdated = state.items.filter((item) => {
        return item.title !== action.mealRemovedId;
      });
    }

    const totalAmountUpdated = itemsUpdated.reduce((currentValue, newValue) => {
      return currentValue + newValue.price * newValue.qty;
    }, 0);

    const totalQtyUpdated = itemsUpdated.reduce((currentValue, newValue) => {
      return currentValue + newValue.qty;
    }, 0);

    console.log(removedItemIndex);

    return {
      items: itemsUpdated,
      totalAmount: totalAmountUpdated,
      totalQty: totalQtyUpdated,
    };
  }

  if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
      totalQty: 0,
    };
  }

  return {
    items: [],
    totalAmount: 0,
    totalQty: 0,
  };
};

//-----------------------------------------

const CartProvider = (props) => {
  //using reducer---------------------------------------------------

  const defaultValue = {
    items: [],
    totalAmount: 0,
    totalQty: 0,
  };

  const [cart, cartDispatchFnction] = useReducer(reducerFunction, defaultValue);

  //----------------------------------------------------------------

  const onMealSubmitHandler = (mealAdded) => {
    /*   mealAdded = {
    title: title,
    price: price,
    qty: qty
  } */
    cartDispatchFnction({
      type: "MEAL_ADDED",
      meal: mealAdded,
    });
  };

  //--------------------------------------------------------------------

  const onAddSubmitHandler = (mealAdded) => {
    //received from Modal.js
    /* mealAdded = {
      title: '',
      price: 0,
      qty: 0,
    } */
    //
    cartDispatchFnction({
      type: "ADD_MEAL",
      mealAdded: mealAdded,
    });
  };

  //-------------------------------------------------------------------
  const onRemoveSubmitHandler = (mealRemovedId) => {
    //received from Modal.js
    //mealRemovedId = item.title;

    cartDispatchFnction({
      type: "REMOVE_MEAL",
      mealRemovedId: mealRemovedId,
    });
  };

  const onClearCartHandler = () => {
    cartDispatchFnction({ type: "CLEAR" });
  };

  return (
    <MealContext.Provider
      value={{
        items: cart.items,
        totalAmount: cart.totalAmount,
        totalQty: cart.totalQty,
        onMealSubmit: onMealSubmitHandler,
        onAddSubmit: onAddSubmitHandler,
        onRemoveSubmit: onRemoveSubmitHandler,
        onClearCart: onClearCartHandler,
      }}
    >
      {props.children}
    </MealContext.Provider>
  );
};

export default CartProvider;
