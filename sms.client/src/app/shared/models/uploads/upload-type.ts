export interface UploadType {
    
    id: string;
    name: string;
    code: string;
    description: string;
    allowedFileTypes: string;
    extensions: UploadMimeType[];
}

export interface UploadMimeType {
    id: number;
	type: string;
	name: string;
	checked: boolean;
}