import axios from "axios";
// import { getPosition, getPolicyLocation } from "./utils";
// const key = process.env.REACT_APP_GEO_KEY;
import { getPosition, getPolicyLocation } from "./utils";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import { v4 as uuidv4 } from "uuid";

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
  isSavingPlan: false,
  //fetch user location
  position: null,
  status: "idle",
  error: "",
  userCenter: null,
  categories: [],
  derivedData: [],
  planLink: "",
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

    case "SAVING_PLAN":
      return {
        ...state,
        isSavingPlan: true,
      };

    case "PLAN_SUCCESSFULLY_SAVED":
      return {
        ...state,
        isSavingPlan: false,
      };
    case "SHARE_PLAN_LINK":
      return {
        ...state,
        planLink: action.payload,
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
      dispatch({ type: "SAVING_PLAN" });
      const id = uuidv4();
      const req = { id, derivedData: getState().derivedData };
      const { data } = await axios.post("/saveplan", req);
      console.log("response backend to thunk :", data);
      if (data.message === "success") {
        const plan = data.user.plans[data.user.plans.length - 1];
        dispatch({ type: "PLAN_SUCCESSFULLY_SAVED" });
        dispatch({ type: "SHARE_PLAN_LINK", payload: plan });
      }
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
      dispatch({
        type: "location/found",
        payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
      });

      //because you are setting the user center here just use the user center as default plan location it will always be last updated either here or in the component

      dispatch({
        type: "SET_USER_CENTER",
        payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
      });

      geocodeByLatLng(newCenter)
        .then((results) => {
          dispatch({
            type: "SET_USER_POSITION_GEOCODED_ADDRESS",
            payload: results,
          });

          dispatch(getLocationDataByCategories());
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
