import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/user.service";
import { DashboardService } from "../../shared/dashboard.service";
import { StorageService } from "../../shared/storage.service";
import { DashboardDTO } from "../../shared/DashboardDTO";
import { UserDTO } from "../../shared/UserDTO";
import { ActivatedRoute, Router } from '@angular/router';


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
    private dashboardService: DashboardService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.dashboards = data.dashboards;
    });

    

  }


  loadDashboard(id: string) {
    this.router.navigateByUrl("/dashboard/" + id);
  }


  leaveDashboard(dashboardid: string, userid: string) {
    this.userService.leaveDashboard(dashboardid, userid).subscribe(data => {

    });
    window.location.reload();
  }

  addSection(id: string) {

    var sectionTitle = prompt("Please input section title");
    if (sectionTitle.trim() !== '') {
      this.dashboardService.addSection(id, sectionTitle).subscribe(data => {

      });
      window.location.reload();

    }


  }

  deleteDashboard(id: string) {

    if (confirm("Are you sure you want to delete this dashboard?")) {
      this.userService.deleteDashboard(id).subscribe(data => {

      });
      window.location.reload();
    }

  }

  addDashboard() {
    this.router.navigateByUrl("/add-dashboard");
  }

}
