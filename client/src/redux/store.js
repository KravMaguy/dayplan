import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(
  // Add whatever middleware you actually want to use here
  applyMiddleware()
  // other store enhancers if any
);

export const store = createStore(reducer, composedEnhancer);
