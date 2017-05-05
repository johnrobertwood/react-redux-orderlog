import { combineReducers } from 'redux';
import orders from './orderReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import visibilityFilter from './visibilityFilterReducer';

const rootReducer = combineReducers({
  orders,
  authors,
  ajaxCallsInProgress,
  visibilityFilter
});

export default rootReducer;