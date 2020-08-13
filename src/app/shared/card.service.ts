import { Injectable } from '@angular/core';
import { UserDTO } from "./UserDTO";
import { CardDTO } from "./CardDTO";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { UserCardPayload } from "./user-card.payload";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  addUserToCard(user: UserDTO, card: CardDTO): Observable<any>{
    const userCardPayload = {
      cardid: card.id,
      userid: user.id
    }
    return this.httpClient.post(this.baseUrl+"/card/userJoinCard", userCardPayload);
  }

  leaveCard(user: UserDTO, card: CardDTO): Observable<any> {
    const userCardPayload = {
      cardid: card.id,
      userid: user.id
    }
    return this.httpClient.post(this.baseUrl+"/card/userLeaveCard", userCardPayload);
  }

}
