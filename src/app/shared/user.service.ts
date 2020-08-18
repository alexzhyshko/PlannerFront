import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { UserDTO } from "./UserDTO";
import { Observable } from "rxjs";
import { CreateDashboardPayload } from "./create-dashboard.payload";
import { JoinDashboardPayload } from "./join-dashboard.payload";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  getCurrentUser(): Observable<UserDTO>{
    return this.httpClient.get<UserDTO>(this.baseUrl+'/user/'+this.storage.getUsername());
  }

  deleteDashboard(id: string): Observable<any>{
    return this.httpClient.get(this.baseUrl+"/user/deleteDashboard/"+id);
  }

  leaveDashboard(dashboardid: string, userid: string): Observable<any>{
    return this.httpClient.get(this.baseUrl+"/user/leaveDashboard/"+dashboardid+"/"+userid);
  }

  createDashboard(dashboardTitle: string, userName: string){
    const createDashboardPayload = {
      title: dashboardTitle
    }
    return this.httpClient.post(this.baseUrl+"/user/createDashboard/"+userName, createDashboardPayload);
  }

  joinDashboard(dashboardId: string, userName: string){
    const joinDashboardPayload = {
      dashboardid: dashboardId,
      username: userName
    }
    return this.httpClient.post(this.baseUrl+"/user/joinDashboard", joinDashboardPayload);
  }

  clearNotifications(user: UserDTO) {
    return this.httpClient.get(this.baseUrl+"/user/clearAllNotifications/"+user.id);
  }


  readAllNotifications(user: UserDTO): Observable<any>{
    return this.httpClient.get(this.baseUrl+"/user/readAllNotifications/"+user.id);
  }



}
