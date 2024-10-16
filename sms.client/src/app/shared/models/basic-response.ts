export interface BasicResponse {
    status: boolean;
    message: string;
    errors: Error[];
}

export interface ItemResponse<T> extends BasicResponse{
    data: T
}
export interface TransferResponse<T> extends BasicResponse{
    data: T[]
    recordCount: number
}


export interface ImportError {
	rowInfo: string;
	errors: string[];
}

export interface ImportResponse {
	data: ImportError[];
	status: boolean;
	message: string;
	errors: any[];
}