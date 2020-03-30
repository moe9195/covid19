import { SET_COUNTRY } from "../actions/actionTypes";

const initialState = { countryData: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRY:
      return {
        ...state,
        countryData: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
