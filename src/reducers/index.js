import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import visibilityFilter from './visibilityFilterReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  visibilityFilter
});

export default rootReducer;