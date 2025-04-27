import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user";
import { API_STATUS, apiStatus } from "../interfaces";

interface AuthState {
	user: User;
	authStatus: apiStatus;
}

const initialState: AuthState = {
	user: {
		name: "",
		email: "",
	},
	authStatus: {
		code: API_STATUS.IDLE,
		message: '',
	}
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
