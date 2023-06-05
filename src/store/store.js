import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from "redux";
import rootReducer from "../rootReducer/rootReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
