import { createStore } from "redux";
import { defaultState } from "./defaultState";
import { rootReducer } from "../reducers";

export const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
