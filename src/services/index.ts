import axios from "axios";
import { DogSearchParams, LocationSearchParams, User } from "../interfaces";

const version = "";
const baseURL = `https://frontend-take-home-service.fetch.com${version}`;

export const http = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

// auth ------------------------------------------------------
export function login(user: User) {
	return http.post("/auth/login", user);
}

export function logout() {
	return http.post("/auth/logout");
}
// end auth --------------------------------------------------

// dogs ------------------------------------------------------
export function getDogs(dogIds: string[]) {
	return http.post("/dogs", dogIds);
}

export function getBreeds() {
	return http.get("/dogs/breeds");
}

export function matchDog(dogIds: string[]) {
	return http.post("/dogs/match", dogIds);
}

export function searchDogs(params: DogSearchParams) {
	return http.get("/dogs/search", { params });
}
// end dogs --------------------------------------------------

// locations -------------------------------------------------
export function getLocations(zipCodes: string[]) {
	return http.post("/locations", zipCodes);
}

export function searchLocations(params: LocationSearchParams) {
	return http.post("/locations/search", { params });
}
// end locations ---------------------------------------------
