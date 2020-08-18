import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
import { UserService } from "../../shared/user.service";
import { UserDTO } from "../../shared/UserDTO";
import { ToastrService } from "ngx-toastr";
import { CardService } from "../../shared/card.service";
import { CardDTO } from "../../shared/CardDTO";
import { StorageService } from "../../shared/storage.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  errMsg: boolean = true;
  user: UserDTO;

  constructor(private authService: AuthService, private userService: UserService,
    private cardService: CardService,
    private toastr: ToastrService,
    private router: Router,
    private storage: StorageService) {
    if (!this.isLoggedIn()) {
      window.location.replace("/");
      return;
    }
  }

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      window.location.replace("/");
    }
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.errMsg = false;
    });
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  leaveCard(user: UserDTO, card: CardDTO) {
    this.cardService.leaveCard(user, card).subscribe(data => { }, err => {
      if (err.status === 201) {
        window.location.reload();
      } else if (err.status === 409) {
        this.toastr.error("You are already member of this card");
      }
    });
  }

  loadDashboardOfCard(user: UserDTO, card: CardDTO) {
    this.storage.writeCurrentSectionToStorage(card.section.id);
    this.router.navigateByUrl("/dashboard/" + card.section.dashboard.id);
  }


}
