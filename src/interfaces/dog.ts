type SortOrder = "asc" | "desc";

type DogSortField = "breed" | "name" | "age";

export type DogSortValue = `${DogSortField}:${SortOrder}`; 

export interface DogSearchParams {
	breeds?: string[];
	zipCode?: string[];
	ageMin?: number;
	ageMax?: number;
	size?: number;
	from?: string;
	sort?: DogSortValue;
}

export interface DogSearchResult {
	next?: string;
	prev?: string;
	resultIds: string[];
	total: number;
}

export interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
	favorite?: boolean;
	cityState?: string;
}

export interface Match {
	match: string;
}
