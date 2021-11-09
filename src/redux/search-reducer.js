let SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

let initialState = {
  searchValue: '',
};

let searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    default:
      return state;
  }
};

export const setSearchValue = (searchValue) => ({
  type: SET_SEARCH_VALUE,
  searchValue,
});

export let getSearchValue = (searchValue) => {
  return async (dispatch) => {
    dispatch(setSearchValue(searchValue));
  };
};

export default searchReducer;
