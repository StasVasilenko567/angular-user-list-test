import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WorkSheduleRow } from "../models/work-shedule-row.model";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "app/shared/configs/api-endoints.config";
import { WorkerDTO } from "../models/dto/workers-dto.model";

@Injectable()
export class WorkerApiService {
    private readonly http = inject(HttpClient);

    public getWorkers(): Observable<WorkerDTO[]> {
        return this.http.get<WorkerDTO[]>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.WORKERS}`);
    }

    public addEmployee(employee: WorkSheduleRow): Observable<WorkerDTO> {
        return this.http.post<WorkerDTO>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.WORKERS}`, {data: employee} as WorkerDTO);
    }
}