import { combineReducers } from "redux";
import CheckLandingReducer from "../Component/Landing_Borrowing/redux/reducers/reducer";
import groupReducer from "../Component/GroupDetailForm/redux/reducer/reducer";
import paymentReducer from "../Component/Payment/redux/reducer/reducer";
import HistoryReducer from "../Component/History/redux/reducer/reducer";
const rootReducer = combineReducers({
  group: groupReducer,
  payment: paymentReducer,
  history: HistoryReducer,
  CheckLandingReducer: CheckLandingReducer,
});

export default rootReducer;
