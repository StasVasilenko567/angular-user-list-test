import { inject, Pipe, PipeTransform } from "@angular/core";
import { WorkScheduleDay } from "../../models/work-schedule-day.model";
import { DepartmentManagementService } from "../../services/department-management.service";

@Pipe({
    name: "dayColor",
    standalone: true,
})
export class WorkDayColorPipe implements PipeTransform {
    private readonly departmentService = inject(DepartmentManagementService);

    public transform(wsd: WorkScheduleDay, ...args: any[]) {
        if (wsd.dayOffType !== 4 && this.departmentService.checkDepartmentAt(wsd.departmentId, wsd.id)) {
            return "day__green";
        } else if(wsd.dayOffType !== 4 && !this.departmentService.checkDepartmentAt(wsd.departmentId, wsd.id)) {
            return "day__red";
        } else if (!this.departmentService.checkDepartmentAt(wsd.departmentId, wsd.id)) {
            return "day__uncompleted";
        }

        return;
    }
}