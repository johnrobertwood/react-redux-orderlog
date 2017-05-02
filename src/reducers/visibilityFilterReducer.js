const visibilityFilterReducer = (state = 'SHOW_ACTIVE', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilterReducer;
