import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_ENDPOINTS } from "app/shared/configs/api-endoints.config";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class PineApiService {
    private readonly http = inject(HttpClient);

    public getPines(): Observable<any[]> {
        return this.http.get<any[]>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.PINES}`);
    }
}