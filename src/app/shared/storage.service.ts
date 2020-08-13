import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private localStorage: LocalStorageService) { }

  getUsername(): string{
    return this.localStorage.retrieve('username');
  }

  writeCurrentSectionToStorage(sectionId: string){
    this.localStorage.store('sectionId', sectionId);
  }

  getCurrentSection(): string{
    return this.localStorage.retrieve('sectionId');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean{
    return this.getJwtToken() != null;
  }

}
