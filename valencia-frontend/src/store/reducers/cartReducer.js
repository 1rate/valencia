const initialState = {
  items: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    case 'DECREASE_QUANTITY':
      const decreaseItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (decreaseItemIndex !== -1) {
        const updatedItems = [...state.items];
        if (updatedItems[decreaseItemIndex].quantity > 1) {
          updatedItems[decreaseItemIndex].quantity -= 1;
        } else {
          updatedItems.splice(decreaseItemIndex, 1);
        }
        return {
          ...state,
          items: updatedItems,
        };
      }
      return state;
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}

export default cartReducer;
