import { ADD_ITEM, INIT_ITEM, REMOVE_ITEM, DELETE_ALL_LIST, SAVE_ITEM, EDIT_ITEM, EDIT_ALL_LIST } from "./actions";

function manageList(state = { items:[] }, action) {
  switch (action.type) {
    case INIT_ITEM:
      return { items: action.payload }
    case ADD_ITEM:
      return { items: [...state.items, action.payload] };
    case EDIT_ALL_LIST:
      return {
        ...state,
        items: state.items.map(
          i => ({ ...i, isValid: true })
        )
      }
    case REMOVE_ITEM:
      return {
        items: [
          ...state.items.slice(0, action.payload),
          ...state.items.slice(action.payload + 1)
        ]
      }
    case SAVE_ITEM:
      const saveItems = state.items.map(
        i => i.id === action.payload.item.id ? { ...i, name: action.payload.value, isValid: false } : i = i
      );
      return {
        ...state,
        items: saveItems
      }
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(
          i => i.id === action.payload.id ? { ...i,isValid: true } : i = i
        )
      }
    case DELETE_ALL_LIST:
      return { items: [] };
    default:
      return state;
  }
}

export default manageList;