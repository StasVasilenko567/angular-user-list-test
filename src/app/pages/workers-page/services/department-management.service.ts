import { inject, Injectable } from "@angular/core";
import { WorkersFacade } from "../facades/workers.facade";

interface shiftDataSummary {
    isBoss: boolean;
    shiftType: string;
    workerName: string;
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
                // console.log(this.workers()[i].collection[dayNumber]);
                
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

        // console.log("У");
        // if (morningWorkersToday.length !== 0)
        //     console.log(morningWorkersToday);

        // console.log("В");
        // console.log(eveningWorkersToday);
        
        if (morningWorkersToday.length >= 2) {
            morningWorkersToday.forEach(worker => {
                if (worker.isBoss) {
                    flag = true;
                    console.log("Гусь")
                }
            });
        }
        if (eveningWorkersToday.length >= 2) {
            eveningWorkersToday.forEach(worker => {
                if (worker.isBoss) {
                    console.log("Свинья")
                    flag = true;
                }
            });
        }
        return flag;
    }
}