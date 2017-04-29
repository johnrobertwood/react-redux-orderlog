import * as types from '../actions/actionTypes';
import initialState from './initialState';

const course = (state, action) => {
  if (state.id !== action.id) {
    return state;
  }

  return Object.assign({}, state, {complete: !state.complete});
};

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.TOGGLE_COURSE:
      return state.map(c =>
        course(c, action)
      );

    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}