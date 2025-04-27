import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBreeds } from "../services";
import { API_STATUS, apiStatus } from "../interfaces";

export interface BreedState {
	breeds: string[];
	status: apiStatus;
};

const initialState: BreedState = {
	breeds: [],
	status: {
		code: API_STATUS.IDLE,
		message: '',
	}
};

const breedSlice = createSlice({
	name: "breed",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getBreedsAsync.pending, (state) => {
				state.status.code = API_STATUS.PENDING;
				state.status.message = "Getting breeds...";
			})	
			.addCase(getBreedsAsync.fulfilled, (state, action: PayloadAction<string[]>) => {
				state.status.code = API_STATUS.SUCCESS;
				state.status.message = "Completed getting breeds";
				state.breeds = action.payload;
			})
			.addCase(getBreedsAsync.rejected, (state) => {
				state.status.code = API_STATUS.ERROR;
				state.status.message = "Failed to get breeds";
			})
	}
});

export const getBreedsAsync = createAsyncThunk(
	'breed/getBreedsAsync',
	async () => {
		try {
			const response = await getBreeds();
			if (response.status === 401) throw new Error("Failed to get breeds");

			return response.data;
		} catch (error) {
			console.error('Failed to get breeds:', error);
			throw error;
		}
	}
);

export default breedSlice.reducer;
