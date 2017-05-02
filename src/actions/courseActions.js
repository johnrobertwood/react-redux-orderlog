import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { pathToJS } from 'react-redux-firebase';
import database from '../database';
import firebase from 'firebase';

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function toggleCourse(id) {
  return {type: types.TOGGLE_COURSE, id};
}

export function setVisibilityFilter(filter) {
  return {type: types.SET_VISIBILITY_FILTER, filter};
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function courseComplete(course) {
  return function(dispatch, getState) {
    dispatch(toggleCourse(course.id));
    course.complete = !course.complete;

    return courseApi.saveCourse(course).then(savedCourse => {
      dispatch(updateCourseSuccess(savedCourse))

      // course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        // dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function saveCourse(course) {
  console.log(course);
  return function(dispatch, getState) {
    // const auth = pathToJS(getState.firebase, 'auth');
    // course.owner = auth.uid;
    dispatch(beginAjaxCall());

    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}