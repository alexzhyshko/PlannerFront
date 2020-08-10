import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/user.service";
import { StorageService } from "../../shared/storage.service";
import { DashboardDTO } from "../../shared/DashboardDTO";
import { UserDTO } from "../../shared/UserDTO";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UserDTO;
  dashboards: Array<DashboardDTO> = [];

  constructor(private storage: StorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.dashboards = data.dashboards;
    });

  }


  loadDashboard(id: string) {
    this.router.navigateByUrl("/dashboard/" + id);
  }

  addSection() {
    console.log("add");

  }

  deleteDashboard(id: string) {
    if (confirm("Are you sure you want to delete this dashboard?")) {
      this.userService.deleteDashboard(id).subscribe(data => {
        console.log(data);
      });
      window.location.reload();
    }

  }

  joinDashboard() {
    console.log("join");

  }

}
