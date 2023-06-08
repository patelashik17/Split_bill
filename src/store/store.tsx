import { legacy_createStore as  createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../rootReducer/rootReducer";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
