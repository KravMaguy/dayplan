import axios from "axios";
// import { getPosition, getPolicyLocation } from "./utils";
// const key = process.env.REACT_APP_GEO_KEY;
import { getPosition, getPolicyLocation } from "./utils";
import { geocodeByLatLng } from "react-google-places-autocomplete";
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
  vehicle_save: "vehicle/save",
};

const initialState = {
  businesses: {},
  center: { lat: 42.009933, lng: -87.70515 },
  isFetching: false,
  // below is the yelp err
  // error: null,
  count: 0,
  //fetch user location
  position: null,
  status: "idle",
  error: "",
  userCenter: null,
  categories: [],
  derivedData: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_BUISNESSES_BY_CATEGRORY":
      return { ...state, businesses: action.payload };
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
    default:
      return state;
  }
}

export function fetchBusinesses(terms) {
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

export function saveThisPlan(derivedData) {
  return async function (dispatch, getState) {
    if (getState().derivedData.length < 1) return;
    try {
      const req = { derivedData: getState().derivedData };
      const { data } = await axios.post("/saveplan", req);
      console.log("response backend to thunk :", data);
    } catch (error) {
      console.log({ error });
    }
  };
}
//below the fetch user location

export function getUserPosition() {
  return async function (dispatch, getState) {
    if (getState().position) return;
    try {
      dispatch({ type: "location/seeking" });
      const position = await getPosition();
      const newCenter = { lat: position[0], lng: position[1] };
      dispatch({
        type: "SET_CENTER",
        payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
      });
      // const county = await getPolicyLocation(key, ...position);
      dispatch({
        type: "location/found",
        payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
      });

      dispatch({
        type: "SET_USER_CENTER",
        payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
      });

      geocodeByLatLng(newCenter)
        .then((results) => {
          return dispatch({
            type: "SET_USER_POSITION_GEOCODED_ADDRESS",
            payload: results,
          });
        })
        .catch((error) => console.error(error));
    } catch (error) {
      dispatch({ type: "location/error", payload: error.message });
    }
  };
}

/**get locations by user location and selected categories */

export function getLocationDataByCategories() {
  return async function (dispatch, getState) {
    try {
      const { center } = getState().userCenter;
      const categories = getState().categories;
      const request = { center, categories };
      const { data } = await axios.post("/api/", request);
      dispatch({
        type: "SET_BUISNESSES_BY_CATEGRORY",
        payload: data,
      });
    } catch (error) {
      // dispatch({ type: "location/error", payload: error.message });
    }
  };
}
