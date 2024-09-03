export interface AppProject {
	id: string;
	code: string;
	name: string;
	description: string;
	startDate: string;
	expectedEndDate?: string |any;
	active: boolean;
}