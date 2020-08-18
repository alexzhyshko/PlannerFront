import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/shared/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../shared/user.service";
import { UserDTO } from "../../shared/UserDTO";
import { NotificationDTO } from "../../shared/NotificationDTO";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  user: UserDTO;
  hasNotReadNotifications = false;
  dropdownOpened = false;


  constructor(private authService: AuthService, private router: Router,
    private userService: UserService) { }


  ngOnInit(): void {
    this.updateUser();
  }


  updateUser() {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.user.notifications.sort((a: NotificationDTO, b: NotificationDTO) => {
        return this.compareDates(a.created, b.created);
      });
      this.isLoggedIn = this.authService.isLoggedIn();
      for (let notification of this.user.notifications) {
        if (!notification.seen) {
          this.hasNotReadNotifications = true;
          break;
        }
      }
    });
  }

  goToUserProfile() {
    this.router.navigateByUrl("/profile");
  }

  logout() {
    this.authService.logout();
    window.location.replace("/");
  }

  readAllNotifications(user: UserDTO) {
    this.dropdownOpened = !this.dropdownOpened;
    if (!this.dropdownOpened) {
      this.userService.readAllNotifications(user).subscribe(data => { }, err => {
        if (err.status === 200){
          for (let notification of this.user.notifications) {
            if (!notification.seen) {
              notification.seen = true;
            }
          }
          this.hasNotReadNotifications = false
        }
      });
    }
  }

  clearNotifications(user: UserDTO) {
    this.userService.clearNotifications(user).subscribe(data => { }, err => {
      if (err.status === 200) {
        this.hasNotReadNotifications = false
        this.updateUser();
      }

    });
  }

  compareDates(d1: Date, d2: Date): number{
    if(d2[0]===d1[0]){
      if(d2[1]===d1[1]){
        if(d2[2]===d1[2]){
          if(d2[3]===d1[3]){
            if(d2[4]===d1[4]){
              if(d2[5]===d1[5]){
                if(d2[6]===d1[6]){
                  if(d2[7]===d1[7]){
                    return 0;
                  }
                  return d2[7]-d1[7];
                }
                return d2[6]-d1[6];
              }
              return d2[5]-d1[5];
            }
            return d2[4]-d1[4];
          }
          return d2[3]-d1[3];
        }
        return d2[2]-d1[2];
      }
      return d2[1]-d1[1];
    }
    return d2[0]-d1[0];
  }

}
