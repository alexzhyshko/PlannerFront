import { Injectable } from '@angular/core';
import { SectionDTO } from "./SectionDTO";
import { CardDTO } from "./CardDTO";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { CreateCardPayload } from "./create-card.payload";
import { SectionCardPayload } from "./section-card.payload";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  getSectionById(dashboardid: string, sectionid: string): Observable<SectionDTO>{
    var username = this.storage.getUsername();
    return this.httpClient.get<SectionDTO>(this.baseUrl+'/section/by-user/'+username+"/"+dashboardid+"/"+sectionid);
  }

  addCard(sectionid: string, title: string, desc: string, due: string): Observable<any>{
    const createCardPayload = {
      title: title,
      description: desc,
      date: due
    }
    return this.httpClient.post(this.baseUrl+'/section/createCard/'+sectionid, createCardPayload);
  }

  deleteCard(section: SectionDTO, card: CardDTO): Observable<any>{
    const sectionCardPayload = {
      cardid: card.id,
      sectionid: section.id
    }
    return this.httpClient.post(this.baseUrl+'/section/removeCard', sectionCardPayload);
  }

}
