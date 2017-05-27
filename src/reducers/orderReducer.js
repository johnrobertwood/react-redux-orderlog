import * as types from '../actions/actionTypes';
import initialState from './initialState';

const order = (state, action) => {
  if (state.id !== action.id) {
    return state;
  }

  return Object.assign({}, state, {complete: !state.complete});
};

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case types.LOAD_ORDERS_SUCCESS:
      return action.orders;

    case types.TOGGLE_ORDER:
      return state.map(c =>
        order(c, action)
      );

    case types.CREATE_ORDER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.order)
      ];    

    case types.UPDATE_ORDER_SUCCESS:
      return [
        ...state.filter(order => order.id !== action.order.id),
        Object.assign({}, action.order)
      ];

    case types.DELETE_ORDER_SUCCESS:
      return [
        ...state.filter(order => order.id !== action.order.id)
      ];

    default:
      return state;
  }
}