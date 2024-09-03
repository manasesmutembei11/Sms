import { ReportGroupItem } from "./report-group-item";

export interface ReportGroup {
    id: string;
    no: number;
    name: string;
    reports?:ReportGroupItem[]
}