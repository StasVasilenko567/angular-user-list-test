import { employeeStatus } from "./enums.models";
import { WorkScheduleDay } from "./work-schedule-day.model";

export interface WorkSheduleRow {
    departmentId: number,
    department: string,
    employeeId: number,
    employee: string,
    employeeStatus: employeeStatus,
    collection: Array<WorkScheduleDay>,
}