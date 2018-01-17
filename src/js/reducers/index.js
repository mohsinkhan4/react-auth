import { combineReducers } from "redux"

import columnData from "./columnDataReducer"
import rowData from "./rowDataReducer"

export default combineReducers({
  rowData,
  columnData
})
