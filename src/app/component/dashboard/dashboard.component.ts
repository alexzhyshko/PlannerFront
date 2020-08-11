import { Component, ViewChild, OnInit } from '@angular/core';
import { DashboardService } from "../../shared/dashboard.service";
import { Router } from "@angular/router";
import { UserDTO } from "../../shared/UserDTO";
import { DashboardDTO } from "../../shared/DashboardDTO";
import { SectionDTO } from "../../shared/SectionDTO";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../shared/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgScrollbar } from 'ngx-scrollbar';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @ViewChild(NgScrollbar, { static: true }) scrollbar: NgScrollbar;
  errMsg: boolean = true;
  dashboard: DashboardDTO;
  user: UserDTO;
  id: string;
  createSectionForm: FormGroup;

  constructor(private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService) {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
    });
    this.createSectionForm = new FormGroup({
      title: new FormControl('', Validators.min(1))
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      });
    this.dashboardService.getDashboardById(this.id).subscribe(data => {
      this.dashboard = data;
      this.errMsg = false;
    });
  }

  loadSection(id: string) {
    var str = '';
    this.route.url.subscribe(data => {
      str = "/" + data[0] + "/" + data[1];
    });
    console.log(str);
    this.router.navigateByUrl(str + "/section/" + id);
  }

  copyIdToClipboard(id: string) {
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.toastr.success('Copied');
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

  toggleCreateCard(section: SectionDTO) {
    section.cardCreate = !section.cardCreate;
  }

  toggleDeleteSection(section: SectionDTO) {
    section.deleteSectionFlag = !section.deleteSectionFlag;
  }


  leaveDashboard(dashboardid: string, userid: string) {
    this.userService.leaveDashboard(dashboardid, userid).subscribe(data => { });
    window.location.replace("/");
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
    window.location.replace("/");
  }

  deleteSection(section: SectionDTO) {
    console.log("del");

    this.dashboardService.deleteSection(section.id).subscribe(data => { });
    window.location.reload();
  }

}
