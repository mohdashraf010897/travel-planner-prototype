import { combineReducers } from "redux";
import transferReducer from "./transfer/transfer.reducer";

const rootReducer = combineReducers({ transferReducer });

export default rootReducer;
