import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/shared/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../shared/user.service";
import { UserDTO } from "../../shared/UserDTO";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  user: UserDTO;

  constructor(private authService: AuthService, private router: Router,
  private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data=>{
      this.user = data;
      this.isLoggedIn = this.authService.isLoggedIn();
    });
    //this.router.navigateByUrl("/");
  }

  goToUserProfile(){
    this.router.navigateByUrl("/profile");
  }

  logout(){
    this.authService.logout();
    window.location.replace("/");
  }

}
