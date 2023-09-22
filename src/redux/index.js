import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
// import reducer from "./teacher/reducer/TeacherReducer";
import reducer from "./student/reducer/StudentReducer";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
