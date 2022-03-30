import axios from "axios";

const initialState = {
  businesses: {},
  center: { lat: 42.009933, lng: -87.70515 },
  isFetching: false,
  error: null,
  count: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      console.log("incrementing in reducer");
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      console.log("decrementing in reducer");
      return { ...state, count: state.count - 1 };
    case "SET_CENTER":
      return {
        ...state,
        center: {
          lat: action.payload.center.lat,
          lng: action.payload.center.lng,
        },
      };
    case "SET_IS_FETCHING":
      return { ...state, isFetching: action.payload };
    case "SET_SEARCH_RESULT":
      return {
        ...state,
        businesses: action.payload.businesses,
        center: action.payload.center,
        isFetching: false,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
}

export function fetchBusinesses(terms) {
  console.log("in the frontend thunk the terms ", terms);
  return async function (dispatch) {
    try {
      dispatch({ type: "SET_IS_FETCHING", payload: true });
      const { data } = await axios.post("/api/", terms);
      const { businesses, region } = data;
      const { center } = region;
      const { longitude, latitude } = center;
      dispatch({
        type: "SET_SEARCH_RESULT",
        payload: { businesses, center: { lat: latitude, lng: longitude } },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };
}
