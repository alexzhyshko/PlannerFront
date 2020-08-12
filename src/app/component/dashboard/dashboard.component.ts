import { Component, ViewChild, OnInit } from '@angular/core';
import { DashboardService } from "../../shared/dashboard.service";
import { Router } from "@angular/router";
import { UserDTO } from "../../shared/UserDTO";
import { DashboardDTO } from "../../shared/DashboardDTO";
import { SectionDTO } from "../../shared/SectionDTO";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../shared/user.service";
import { SectionService } from "../../shared/section.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgScrollbar } from 'ngx-scrollbar';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(NgScrollbar, { static: true }) scrollbar: NgScrollbar;
  errMsg: boolean = true;
  dashboard: DashboardDTO;
  user: UserDTO;
  id: string;
  createSectionForm: FormGroup;
  createCardForm: FormGroup;
  activeSection: SectionDTO = undefined;

  constructor(private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private sectionService: SectionService) {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
    });
    this.createSectionForm = new FormGroup({
      sectionTitle: new FormControl('', Validators.min(1))
    });
    this.createCardForm = new FormGroup({
      cardTitle: new FormControl('', Validators.min(1)),
      cardDescription: new FormControl('', Validators.min(1)),
      cardDueDate: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      });
    this.dashboardService.getDashboardById(this.id).subscribe(data => {
      this.dashboard = data;
      this.activeSection = this.dashboard.sections[0];
      this.errMsg = false;
    });


  }

  changeActiveSection(section: SectionDTO) {
    this.activeSection = section;
    this.cd.detectChanges();
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
    this.toastr.success('ID copied to clipboard');
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
    this.userService.leaveDashboard(dashboardid, userid).subscribe(data => {


    });
    window.location.replace("/");
    this.toastr.info('Dashboard removed from your account');
  }

  addSection(dashboardid: string) {
    var title = this.createSectionForm.get('sectionTitle').value;
    if (title.trim() !== '') {
      this.dashboardService.addSection(dashboardid, title).subscribe(data => { });


    }
    window.location.reload();
    this.toastr.success('Section ' + title + " added");
  }

  addCard(section: SectionDTO) {
    var title = this.createCardForm.get('cardTitle').value;
    var desc = this.createCardForm.get('cardDescription').value;
    var dateObj = this.createCardForm.get('cardDueDate').value;
    var year = String(dateObj.year);
    var month = (String(dateObj.month).length == 1 ? ("0" + String(dateObj.month)) : String(dateObj.month));
    var day = (String(dateObj.day).length == 1 ? "0" + String(dateObj.day) : String(dateObj.day));
    var due = year + "-" + month + "-" + day;
    var sectionid = section.id;
    if (title.trim() !== '' && year.trim() !== '' && month.trim() !== '' && day.trim() !== '' && due.trim() !== '') {
      this.sectionService.addCard(sectionid, title, desc, due).subscribe(data => { });

    }
    window.location.reload();
    this.toastr.success('Card ' + title + " added");

  }

  deleteDashboard(id: string) {
    this.userService.deleteDashboard(id).subscribe(data => { });
    window.location.replace("/");
    this.toastr.error('Dashboard deleted');
  }

  deleteSection(section: SectionDTO) {
    console.log(section);
    this.dashboardService.deleteSection(section.id).subscribe(data => { });
    window.location.reload();
    this.toastr.error('Section ' + section.title + " removed");
  }

}
