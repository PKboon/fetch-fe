import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDogs, matchDog, searchDogs } from "../services";
import {
	API_STATUS,
	apiStatus,
	Dog,
	DogSearchParams,
	DogSearchResult,
	Match,
} from "../interfaces";

export interface BrowseState {
	maxKeyCount: number;

	dogs: Dog[];
	matchedDog: Match;
	dogSearchParams: DogSearchParams;
	dogSearchedResult: DogSearchResult;
	currPage: number;
	numPerPage: number;
	browseStatus: apiStatus;
	isFilterOn: boolean;
}

export const dogInitialState: BrowseState = {
	maxKeyCount: 100,

	dogs: [],
	dogSearchedResult: {
		resultIds: [],
		total: 0,
	},
	dogSearchParams: {
		breeds: [],
		zipCodeString: "",
		zipCodes: [],
		ageMin: 0,
		ageMax: 14,
		size: 25,
		sort: "breed:asc",
	},
	matchedDog: {
		match: "",
	},
	currPage: 1,
	numPerPage: 25,
	browseStatus: {
		code: API_STATUS.IDLE,
		message: "",
	},
	isFilterOn: false,
};

const browseSlice = createSlice({
	name: "browse",
	initialState: dogInitialState,
	reducers: {
		setCurrPage: (state, action) => {
			state.currPage = action.payload;
		},
		setNumPerPage: (state, action) => {
			state.numPerPage = action.payload;
		},
		toggleFavorite: (state, action) => {
			const foundDog = state.dogs.find(
				(dog) => dog.id === action.payload
			);
			if (foundDog) foundDog.favorite = !foundDog.favorite;
		},
		isFilterOn: (state) => {
			state.isFilterOn = Object.keys(dogInitialState).every(
				(key) =>
					dogInitialState.dogSearchParams[
						key as keyof DogSearchParams
					] === state.dogSearchParams[key as keyof DogSearchParams]
			);
		},
		setSearchParams: (state, action) => {
			state.dogSearchParams = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchDogsAsync.pending, (state) => {
				state.browseStatus.code = API_STATUS.PENDING;
				state.browseStatus.message = "Searching dogs...";
			})
			.addCase(
				searchDogsAsync.fulfilled,
				(state, action: PayloadAction<DogSearchResult>) => {
					state.browseStatus.code = API_STATUS.SUCCESS;
					state.browseStatus.message = "Completed searching dogs";
					state.dogSearchedResult = action.payload;
				}
			)
			.addCase(searchDogsAsync.rejected, (state) => {
				state.browseStatus.code = API_STATUS.ERROR;
				state.browseStatus.message = "Failed to get breeds";
			})
			.addCase(getDogsAsync.pending, (state) => {
				state.browseStatus.code = API_STATUS.PENDING;
				state.browseStatus.message = "Getting dogs...";
			})
			.addCase(
				getDogsAsync.fulfilled,
				(state, action: PayloadAction<Dog[]>) => {
					state.browseStatus.code = API_STATUS.SUCCESS;
					state.browseStatus.message = "Completed getting dogs";
					state.dogs = action.payload;
				}
			)
			.addCase(getDogsAsync.rejected, (state) => {
				state.browseStatus.code = API_STATUS.ERROR;
				state.browseStatus.message = "Failed to get dogs";
			})
			.addCase(getDogMatchAsync.pending, (state) => {
				state.browseStatus.code = API_STATUS.PENDING;
				state.browseStatus.message = "Mathcing dog...";
			})
			.addCase(
				getDogMatchAsync.fulfilled,
				(state, action: PayloadAction<Match>) => {
					state.browseStatus.code = API_STATUS.SUCCESS;
					state.browseStatus.message = "Completed mathcing dogs";
					state.matchedDog = action.payload;
				}
			)
			.addCase(getDogMatchAsync.rejected, (state) => {
				state.browseStatus.code = API_STATUS.ERROR;
				state.browseStatus.message = "Failed to match dogs";
			});
	},
});

export const searchDogsAsync = createAsyncThunk(
	"browse/searchDogsAsync",
	async (params: DogSearchParams) => {
		try {
			const response = await searchDogs(params);
			if (response.status === 401)
				throw new Error("Failed to search dogs");

			return response.data as DogSearchResult;
		} catch (error) {
			console.error("Failed to search dogs:", error);
			throw error;
		}
	}
);

export const getDogsAsync = createAsyncThunk(
	"browse/getDogsAsync",
	async (params: string[]) => {
		try {
			const response = await getDogs(params);
			if (response.status === 401) throw new Error("Failed to get dogs");

			return response.data as Dog[];
		} catch (error) {
			console.error("Failed to get dogs:", error);
			throw error;
		}
	}
);

export const getDogMatchAsync = createAsyncThunk(
	"browse/getDogMatchAsync",
	async (params: string[]) => {
		try {
			const response = await matchDog(params);
			if (response.status === 401) throw new Error("Failed to match dog");

			return response.data as Match;
		} catch (error) {
			console.error("Failed to match dog:", error);
			throw error;
		}
	}
);

export const {
	setCurrPage,
	setNumPerPage,
	toggleFavorite,
	isFilterOn,
	setSearchParams,
} = browseSlice.actions;
export default browseSlice.reducer;
