export interface LocationSearchParams {
	city?: string;
	states?: string[];
	geoBoundingBox?: {
		top?: number;
		left?: number;
		bottom?: number;
		right?: number;
		bottom_left?: Coordinates;
		top_left?: Coordinates;
	};
	size?: number;
	from?: number;
}

export interface Location {
	zip_code: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	county: string;
}

export interface Coordinates {
	lat: number;
	lon: number;
}
