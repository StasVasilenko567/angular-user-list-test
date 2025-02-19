import { inject, Injectable } from "@angular/core";
import { WorkersFacade } from "../facades/workers.facade";
import { RandomUtils } from "../utils/randomizer.util";

@Injectable()
export class RandomizerService {
    private readonly workersFacade = inject(WorkersFacade);
    private workers = this.workersFacade.workers;

    public randomWorker() {
        const temp_worker = RandomUtils.randomWorkScheduleRow(this.workers().length);
        this.workersFacade.addEmployee(temp_worker);
    }
}