import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import breedReducer from "./breedSlice";
import browseReducer from "./browseSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		breed: breedReducer,
		browse: browseReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
