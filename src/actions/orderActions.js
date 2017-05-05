import * as types from './actionTypes';
import orderApi from '../api/mockOrderApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { pathToJS } from 'react-redux-firebase';
import database from '../database';
import firebase from 'firebase';

export function loadOrdersSuccess(orders) {
  return {type: types.LOAD_ORDERS_SUCCESS, orders};
}

export function createOrderSuccess(order) {
  return {type: types.CREATE_ORDER_SUCCESS, order};
}

export function updateOrderSuccess(order) {
  return {type: types.UPDATE_ORDER_SUCCESS, order};
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

export function orderComplete(order) {
  return function(dispatch, getState) {
    dispatch(toggleOrder(order.id));
    order.complete = !order.complete;

    return orderApi.saveOrder(order).then(savedOrder => {
      dispatch(updateOrderSuccess(savedOrder));

      // order.id ? dispatch(updateOrderSuccess(savedOrder)) :
        // dispatch(createOrderSuccess(savedOrder));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function saveOrder(order) {
  return function(dispatch, getState) {
    // const auth = pathToJS(getState.firebase, 'auth');
    // order.owner = auth.uid;
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