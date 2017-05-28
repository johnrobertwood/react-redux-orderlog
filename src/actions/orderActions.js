import * as types from './actionTypes';
import orderApi from '../api/orderApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadOrdersSuccess(orders) {
  return {type: types.LOAD_ORDERS_SUCCESS, orders};
}

export function createOrderSuccess(order) {
  return {type: types.CREATE_ORDER_SUCCESS, order};
}

export function updateOrderSuccess(order) {
  return {type: types.UPDATE_ORDER_SUCCESS, order};
}

export function deleteOrderSuccess(order) {
  return {type: types.DELETE_ORDER_SUCCESS, order};
}

export function toggleOrder(id) {
  return {type: types.TOGGLE_ORDER, id};
}

export function setVisibilityFilter(filter) {
  return {type: types.SET_VISIBILITY_FILTER, filter};
}

export function loadOrders() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return orderApi.getAllOrders()
    .then(orders => {
      dispatch(loadOrdersSuccess(orders));
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function saveOrder(order) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return orderApi.saveOrder(order).then(savedOrder => {
      order.id ? dispatch(updateOrderSuccess(savedOrder)) :
        dispatch(createOrderSuccess(savedOrder));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function updateOrder(order) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    dispatch(toggleOrder(order.id));
    order.complete = !order.complete;
    return orderApi.saveOrder(order).then(savedOrder => {
      dispatch(updateOrderSuccess(savedOrder));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function deleteOrder(order) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return orderApi.deleteOrder(order).then(orders => {
      dispatch(loadOrdersSuccess(orders));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}