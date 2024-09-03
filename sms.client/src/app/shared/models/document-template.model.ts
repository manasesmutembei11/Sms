export interface DocumentTemplate {
	id: string;
	name: string;
	fileName: string;
	documentTemplateType: number;
	documentTemplateTypeName: string;
	updatedOn: string;
}
export interface DocumentTemplateForm {
	id: string;
	name: string;
	fileUpload: boolean;
	documentTemplateType: number;
}