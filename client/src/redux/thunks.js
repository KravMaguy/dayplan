import axios from "axios";
import { getPosition } from "./utils";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import { v4 as uuidv4 } from "uuid";

export function saveThisPlan() {
  return async function (dispatch, getState) {
    if (getState().data.length < 1) return;
    try {
      dispatch({ type: "SAVING_PLAN" });
      const id = uuidv4();
      const req = { id, derivedData: getState().data };
      const { data } = await axios.post("/saveplan", req);
      if (data.message === "success") {
        const plan = data.user.plans[data.user.plans.length - 1];
        dispatch({ type: "SHARE_PLAN_LINK", payload: plan });
        dispatch({ type: "PLAN_SUCCESSFULLY_SAVED" });
      }
    } catch (error) {
      console.log({ error });
    }
  };
}

export function getUserPosition() {
  return async function (dispatch, getState) {
    if (getState().position) return;
    try {
      dispatch({ type: "location/seeking" });
      const position = await getPosition(dispatch);
      const newCenter = { lat: position[0], lng: position[1] };
      dispatch({
        type: "SET_CENTER",
        payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
      });
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
          dispatch({
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

export function getLocationDataByCategories() {
  return async function (dispatch, getState) {
    try {
      const { center } = getState().userCenter;
      const categories = getState().categories;
      const request = { center, categories };
      const { data } = await axios.post("/api/", request);
      const structuredData = data.map((term) =>
        term.businesses.map((x) => {
          return {
            id: x.id,
            name: x.name,
            coordinates: x.coordinates,
            url: x.url,
            address1: x.location?.address1,
            city: x.location?.city,
            zip: x.location?.zip,
            ...x,
          };
        })
      );
      const Data = [
        {
          name: "Start",
          coordinates: {
            id: "Starting id",
            latitude: center.lat,
            longitude: center.lng,
          },
        },
        ...structuredData.flat(),
      ];

      dispatch({
        type: "SET_DATA",
        payload: Data,
      });
    } catch (error) {
      console.log(error, "err");
      // dispatch({ type: "location/error", payload: error.message });
    }
  };
}
