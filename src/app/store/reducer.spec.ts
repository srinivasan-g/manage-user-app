import { Item, ListOfItems } from "../constant/home/home";
import { API_MOCK } from "../service/api-mock";
import manageList from "./reducer";


describe('Reducer Test', () => {
    let state : ListOfItems;
    let action;
  it('should check all reducer', () => {
    // given
    action = { type: 'INIT_ITEM', payload: API_MOCK };
    // when
    let initState = manageList(state ={ items:[] }, action);
    state = initState;
    // INIT_ITEM
    expect(initState.items.length).toBe(4);

    action = { type: 'ADD_ITEM', payload: { name: 'senthil', id: 5 } };

    let addState = manageList(state, action);
    // ADD_ITEM
    expect(addState.items.length).toBe(5);

    action = { type: 'EDIT_ALL_LIST'};

    let editState = manageList(state, action);
    // EDIT_ALL_LIST
    expect(editState.items[0].isValid).toBe(true);

    action = { type: 'REMOVE_ITEM', payload: 2};

    let removeItemState = manageList(state, action);
    // REMOVE_ITEM
    expect(removeItemState.items.length).toBe(3);

    action = { type: 'SAVE_ITEM', payload: { item:state.items[1],value: 'Kaushik Srinivasan'}};

    let saveItemState = manageList(state, action);
    // SAVE_ITEM
    expect(saveItemState.items[1].name).toBe("Kaushik Srinivasan");

    action = { type: 'DELETE_ALL_LIST'};

    let deleteState = manageList(state, action);
    // DELETE_ALL_LIST
    expect(deleteState.items.length === 0).toBeTruthy();
  })

});