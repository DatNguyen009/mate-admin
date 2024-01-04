import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const toolkitStore = configureStore({
  reducer: rootReducer,
});

export default toolkitStore;
