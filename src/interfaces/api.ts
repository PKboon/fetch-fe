export enum API_STATUS {
	IDLE,
	SUCCESS,
	PENDING,
	ERROR,
}

export interface apiStatus {
	code: API_STATUS;
	message: string;
}