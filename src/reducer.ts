import { combineReducers } from "redux";
import { repos } from "./components/repos/reducer";

export const rootReducer = combineReducers({
  repos,
})