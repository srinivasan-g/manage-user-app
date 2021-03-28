export const ADD_ITEM = "ADD_ITEM";
export const INIT_ITEM = "INIT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const EDIT_ALL_LIST = "EDIT_ALL_LIST";
export const DELETE_ALL_LIST = "DELETE_ALL_LIST";
export const EDIT_ITEM = "EDIT_ITEM";
export const SAVE_ITEM = "SAVE_ITEM";

export function initItem(list) {
  return { type: INIT_ITEM, payload: list };
}

export function addItem(text) {
  return { type: ADD_ITEM, payload: text };
}

export function removeItem(index) {
  return { type: REMOVE_ITEM, payload: index };
}

export function editItem(item) {
  return { type: EDIT_ITEM, payload: item };
}

export function deleteAll() {
  return { type: DELETE_ALL_LIST };
}

export function editAll() {
  return { type: EDIT_ALL_LIST };
}

export function save(item,value) {
  return { type: SAVE_ITEM, payload: {item:item, value:value} };
}
