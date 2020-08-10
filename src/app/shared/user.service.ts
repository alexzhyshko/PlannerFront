import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { UserDTO } from "./UserDTO";
import { Observable } from "rxjs";


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




}
