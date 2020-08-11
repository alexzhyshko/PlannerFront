import { Injectable } from '@angular/core';
import { DashboardDTO } from "./DashboardDTO";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { CreateSectionPayload } from "./create-section.payload";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  getDashboardById(id: string): Observable<DashboardDTO>{
    var username = this.storage.getUsername();
    return this.httpClient.get<DashboardDTO>(this.baseUrl+'/dashboard/by-user/'+username+"/"+id);
  }

  addSection(dashboardid: string, sectionTitle: string): Observable<any>{
    const createSectionPayload = {
      title: sectionTitle
    }
    return this.httpClient.post(this.baseUrl+"/dashboard/createSection/"+dashboardid, createSectionPayload);
  }

}
