function checkerAndReturner(orgnalData: any, newData: any) {
  for (let index = 0; index < orgnalData.length; index++) {
    const element = orgnalData[index];
    if (element.productId == newData.productId) {
      return element;
    }
  }
}

export function cartReducer(state: any, action: any) {
  if (action.payload === "addToCart") {
    let response = checkerAndReturner(state.cart, action.data);
    if (!response) {
      return {
        ...state,
        cart: [...state.cart, action.data],
      };
    } else {
      let dataToStoreAgain = state.cart.filter(
        (item: any) => item.productId !== response.productId
      );
      return {
        ...state,
        cart: [...dataToStoreAgain, action.data],
      };
    }
  } else if (action.payload === "removeFromCart") {
    const newState = {
      ...state,
      cart: state.cart.filter(
        (item: any) => item.productId !== action.data.product_id
      ),
    };
    return newState;
  } else if (action.payload === "removeToCart") {
    return state;
  } else if (action.payload === "updateToCart") {
    return state;
  } else if (action.payload === "updateCartArray") {
    return {
      ...state,
      cartArray: action.data,
    };
  }

  return state;
}
