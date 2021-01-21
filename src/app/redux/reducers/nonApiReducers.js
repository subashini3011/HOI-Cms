import { PAGE_REFRESHING_RESPONSE } from "../actions/actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case PAGE_REFRESHING_RESPONSE:
      return {
        ...state,
        pageRefreshingResponse: {
          isLoading: action.response.isLoading === true
        }
      };

    default:
      return state;
  }
}
