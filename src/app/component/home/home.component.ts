import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/user.service";
import { DashboardService } from "../../shared/dashboard.service";
import { StorageService } from "../../shared/storage.service";
import { DashboardDTO } from "../../shared/DashboardDTO";
import { UserDTO } from "../../shared/UserDTO";
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UserDTO;
  dashboards: Array<DashboardDTO> = [];
  sectionCreate = false;
  dashboardLeaveFlag = false;
  deleteDashboardFlag = false;
  createSectionForm: FormGroup;


  constructor(private storage: StorageService,
    private userService: UserService,
    private dashboardService: DashboardService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.createSectionForm = new FormGroup({
      title: new FormControl('', Validators.min(1))
    });

  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.dashboards = data.dashboards;
    });
  }

  toggleCreateSection(dashboard: DashboardDTO) {
    dashboard.sectionCreate = !dashboard.sectionCreate;
  }

  toggleDeleteDashboard(dashboard: DashboardDTO) {
    dashboard.deleteDashboardFlag = !dashboard.deleteDashboardFlag;
  }

  toggleLeaveDashboard(dashboard: DashboardDTO) {
    dashboard.dashboardLeaveFlag = !dashboard.dashboardLeaveFlag;
  }


  loadDashboard(id: string) {
    this.router.navigateByUrl("/dashboard/" + id);
  }


  leaveDashboard(dashboardid: string, userid: string) {
    this.userService.leaveDashboard(dashboardid, userid).subscribe(data => { });
    window.location.reload();
  }

  addSection(dashboardid: string) {
    var title = this.createSectionForm.get('title').value;
    if (title.trim() !== '') {
      this.dashboardService.addSection(dashboardid, title).subscribe(data => { });
      window.location.reload();
    }
  }

  deleteDashboard(id: string) {
    this.userService.deleteDashboard(id).subscribe(data => { });
    window.location.reload();
  }

  addDashboard() {
    this.router.navigateByUrl("/add-dashboard");
  }

}
