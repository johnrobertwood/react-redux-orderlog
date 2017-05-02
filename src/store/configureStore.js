import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config';

const fbConfig = {
  apiKey: "AIzaSyDKhrWw8CNnSqdswnVpwCU55AiWFWrm5NE",
  authDomain: "qa-log-97824.firebaseapp.com",
  databaseURL: "https://qa-log-97824.firebaseio.com"
};

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
const config = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk.withExtraArgument(getFirebase), 
        logger, 
        reduxImmutableStateInvariant()),
      reactReduxFirebase(fbConfig, config)
    )
  );
}