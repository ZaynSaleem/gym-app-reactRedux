import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import todoReducer from "./reducers/todoReducers";
import TimerReducer from "./reducers/timerReducer";
import AuthReducer from "./reducers/AuthReducer";

const persistConfig = {
  key: "root",
  storage,
};

const combineReducer = combineReducers({
  todo: todoReducer,
  timers : TimerReducer,
  auths: AuthReducer,
});

const persistedReducer = persistReducer(persistConfig, combineReducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
