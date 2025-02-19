import { dayOffType } from "./enums.models";

export interface WorkScheduleDay {
    id: number,
    shift: string,
    date: string,
    dayOffType: dayOffType,
    departmentId: number,
}