import { UploadMimeType } from "./upload-type";

export interface DocumentUploadTypeItem {
    fileName: string;
    id: string;
    relativePath: string;
}
export interface DocumentUploadType {
    no: number;
    code?: any;
    name: string;
    id: string;
    mandatory: boolean;
    items: DocumentUploadTypeItem[];
    status: boolean;
    uploadId: string;
    mimeTypes:UploadMimeType[]
}
