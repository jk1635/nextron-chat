import { combineReducers, createStore } from "redux";
import { userReducer } from "./modules/user";
import { roomReducer } from "./modules/room";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
