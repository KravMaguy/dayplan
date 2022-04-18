const status = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  rejected: "rejected",
};

export const formActionType = {
  location_seeking: "location/seeking",
  location_found: "location/found",
  location_error: "location/error",
};

const initialState = {
  data: [],
  center: { lat: 42.009933, lng: -87.70515 },
  isFetching: false,
  count: 0,
  isSavingPlan: false,
  position: null,
  status: "idle",
  error: "",
  userCenter: null,
  categories: [],
  planLink: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_USER_CENTER":
      return { ...state, userCenter: action.payload };

    case "SET_CENTER":
      return {
        ...state,
        center: {
          lat: action.payload.center.lat,
          lng: action.payload.center.lng,
        },
        data: [],
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
    case formActionType.location_seeking:
      return { ...state, position: null, status: status.pending };
    case formActionType.location_found:
      return { ...state, position: action.payload, status: status.resolved };
    case formActionType.location_error:
      return {
        ...state,
        position: null,
        status: status.rejected,
        error: action.payload,
      };

    case "SET_USER_POSITION_GEOCODED_ADDRESS":
      return {
        ...state,
        position: { ...state.position, geocodedAddress: action.payload },
      };

    case "SET_DERIVED_DATA":
      return {
        ...state,
        derivedData: action.payload,
      };

    case "SAVING_PLAN":
      return {
        ...state,
        isSavingPlan: true,
      };

    case "SHARE_PLAN_LINK":
      return {
        ...state,
        planLink: action.payload,
      };
    case "PLAN_SUCCESSFULLY_SAVED":
      return {
        ...state,
        isSavingPlan: false,
      };
    default:
      return state;
  }
}
