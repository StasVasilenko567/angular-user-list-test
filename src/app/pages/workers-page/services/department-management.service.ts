import { effect, inject, Injectable, signal, Signal } from "@angular/core";
import { WorkersFacade } from "../facades/workers.facade";
import { WorkSheduleRow } from "../models/work-shedule-row.model";

interface shiftDataSummary {
    isBoss: boolean;
    shiftType: string;
    workerName: string;
}

export enum rowDataType {
    summary, employee
}

interface departmentSummary {
    collection: number[];
    department: string;
}

export interface rowData {
    type: rowDataType;
    data: any;
}

@Injectable()
export class DepartmentManagementService {
    private readonly workersFacade = inject(WorkersFacade);
    private workers = this.workersFacade.workers;

    /*
        1. Если вышло не менее 2 человек
        2. хотя бы один начальник
        3. совпадение по сменам
    */

    public checkDepartmentAt(departmentId: number, dayNumber: number): boolean {
        const morningWorkersToday = new Array<shiftDataSummary>();
        const eveningWorkersToday = new Array<shiftDataSummary>();
        let flag = false;

        for (let i = 0; i < this.workers().length; i++) {
            if (this.workers()[i].departmentId === departmentId && this.workers()[i].collection[dayNumber].dayOffType === 4) {
                
                if (this.workers()[i].collection[dayNumber].shift.startsWith("У")) {
                    morningWorkersToday.push({
                        isBoss: this.workers()[i].employeeStatus === 0,
                        shiftType: "У",
                        workerName: this.workers()[i].employee
                    });
                } else {
                    eveningWorkersToday.push({
                        isBoss: this.workers()[i].employeeStatus === 0,
                        shiftType: "В",
                        workerName: this.workers()[i].employee
                    });
                }
            }
        }
        
        if (morningWorkersToday.length >= 2) {
            morningWorkersToday.forEach(worker => {
                if (worker.isBoss) {
                    flag = true;
                }
            });
        }
        if (eveningWorkersToday.length >= 2) {
            eveningWorkersToday.forEach(worker => {
                if (worker.isBoss) {
                    flag = true;
                }
            });
        }
        return flag;
    }

    public getFreeEmployeesAt(dayNumber: number, departmentId: number): number {
        let freeEmployees = 0;
        this.workers().forEach((w) => {
            if (w.departmentId === departmentId && w.collection[dayNumber].dayOffType === 4 && !this.checkDepartmentAt(departmentId, dayNumber)) {
                freeEmployees++;
            }
        });
        return freeEmployees;
    }

    public getDataRows(): rowData[] {
        if (this.workers().length === 0) {
            return [];
        }
        
        const rows: rowData[] = [];
        let lastDepartment: number = this.workers()[0].departmentId;

        this.workers().forEach((worker,i) => {
            if (worker.departmentId !== lastDepartment) {
                rows.push({
                    type: rowDataType.summary,
                    data: {
                        collection: Array(32).fill(0).map((x,j)=>j).map((w,n) => this.getFreeEmployeesAt(n, lastDepartment)),
                        department: this.workers()[i-1].department,
                    }
                });
                lastDepartment = worker.departmentId;
            }

            rows.push({
                type: rowDataType.employee,
                data: worker
            });
        });

        rows.push({
            type: rowDataType.summary,
            data: {
                collection: Array(32).fill(0).map((x,i)=>i+1).map((w,i) => this.getFreeEmployeesAt(i, lastDepartment)),
                department: this.workers()[this.workers().length-1].department,
            }
        })
        return rows;
    }

}