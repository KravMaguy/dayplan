const initialState = {
  businesses: {},
  center: { lat: 42.009933, lng: -87.70515 },
  isFetching: false,
  error: null,
  count: 0,
};

export function reducer(state = initialState, action) {
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
    default:
      return state;
  }
}

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case "SET_IS_FETCHING":
//       return { ...state, isFetching: action.payload };
//     case "SET_SEARCH_RESULT":
//       return {
//         ...state,
//         businesses: action.payload.businesses,
//         center: action.payload.center,
//         isFetching: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// }
