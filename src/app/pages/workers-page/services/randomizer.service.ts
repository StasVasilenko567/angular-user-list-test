import { inject, Injectable } from "@angular/core";
import { WorkersFacade } from "../facades/workers.facade";
import { RandomUtils } from "../utils/randomizer.util";
import { WorkScheduleDay } from "../models/work-schedule-day.model";
import { WorkSheduleRow } from "../models/work-shedule-row.model";

@Injectable()
export class RandomizerService {
    private readonly workersFacade = inject(WorkersFacade);
    private workers = this.workersFacade.workers;

    public randomWorker() {
        const temp_worker = RandomUtils.randomWorkScheduleRow(this.workers().length);
        this.workersFacade.addEmployee(temp_worker);
    }

    public randomDays(employee: WorkSheduleRow): WorkScheduleDay[] {
        const collection = [];
        for (let i = 0; i <= 31; i++) {
            collection.push(RandomUtils.randomDay(i, employee.departmentId));
        }
        return collection;
    }
}