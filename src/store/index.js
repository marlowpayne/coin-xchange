import { createStore } from "redux";
import { defaultState } from "./defaultState";
import { rootReducer } from "../reducers";

export const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(rootReducer, defaultState);
