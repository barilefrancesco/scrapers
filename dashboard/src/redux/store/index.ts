import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../features/loading/loadingSlice";

export default configureStore({
  reducer: {
    loading: loadingReducer,
  },
});
