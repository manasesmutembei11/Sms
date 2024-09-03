export interface EmailContact {
	id: string;
	contactType: number | any;
	contactTypeName: string;
	addressType: number |any;
	addressTypeName: string;
	notificationEmailName: string;
	notificationEmailId: string |any;
}

export interface EmailNotification {
	id: string;
	subject: string;
	template: string;	
	emailContacts: EmailContact[];
}

export interface SmsContact {
	id: string;
	contactType: number | any;
	contactTypeName: string | any;
	notificationSmsName: string | any;
	notificationSmsId: string | any;
	checked:boolean
}

export interface SmsNotification {
	id: string;
	template: string;	
	smsContacts: SmsContact[];
}

export interface AppNotification {	
	id: string;
	description: string;
	type: number;
	typeName: string;
	enableEmail: boolean;
	enableSms: boolean;
}
export interface AppNotificationForm  {
	emailNotification: EmailNotification;
	smsNotification: SmsNotification;
	id: string;
	description: string;
	type: number;
	typeName: string;
	enableEmail: boolean;
	enableSms: boolean;
}