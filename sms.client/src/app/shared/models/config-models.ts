export interface ReportServerConfig {
    reportServerUri: string;
    reportServerUsername: string;
    reportServerPassword: string;
    scheme: string;
    configType: number;
}
export interface StorageConfig {
    configType: number;
    uploadPath: string;
    otherPath: string;
    documentPath: string;
}
export interface MailServerConfig {
	from: string;
	name: string;
	smtpServer: string;
	smtpPort: number;
	smtpUserName: string;
	smtpPassword: string;
	configType: number;
}
export interface ThirdPartyClaimConfig {
	tracingClaimNatureID?: any;
	configType: number;
}
export interface ExpaqMateServerConfig {
    serverUri: string;   
    configType: number;
}