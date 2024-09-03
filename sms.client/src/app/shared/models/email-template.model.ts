export interface EmailTemplate {
	id: string;
	name: string;
	emailTemplateType: number;
	emailTemplateTypeName: string;
	fileName: string;
	fileContent?: any;
}