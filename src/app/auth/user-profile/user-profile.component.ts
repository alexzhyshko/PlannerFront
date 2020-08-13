import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
import { UserService } from "../../shared/user.service";
import { UserDTO } from "../../shared/UserDTO";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  errMsg: boolean = true;
  user: UserDTO;

  constructor(private authService: AuthService, private userService: UserService) {
    if (!this.isLoggedIn()) {
      window.location.replace("/");
      return;
    }
  }

  ngOnInit(): void {
    if(!this.isLoggedIn()){
      window.location.replace("/");
    }
    this.userService.getCurrentUser().subscribe(data=>{
      this.user = data;
      this.errMsg = false;
    });
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
