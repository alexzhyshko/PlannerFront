import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgScrollbar } from 'ngx-scrollbar';
import { ChangeDetectorRef } from '@angular/core';
import { StorageService } from "../../shared/storage.service";

import { UserDTO } from "../../shared/UserDTO";
import { DashboardDTO } from "../../shared/DashboardDTO";
import { SectionDTO } from "../../shared/SectionDTO";
import { CardDTO } from "../../shared/CardDTO";

import { UserService } from "../../shared/user.service";
import { DashboardService } from "../../shared/dashboard.service";
import { SectionService } from "../../shared/section.service";
import { CardService } from "../../shared/card.service";


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

  constructor(private storage: StorageService,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private cardService: CardService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private sectionService: SectionService) {

    if (!this.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
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
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      });
    this.dashboardService.getDashboardById(this.id).subscribe(data => {
      this.dashboard = data;
      this.activeSection = this.storage.getCurrentSection() == null ? this.dashboard.sections[0] : this.getCurrentActiveSection();
      if (this.activeSection === null || this.activeSection === undefined) {
        this.activeSection = this.dashboard.sections[0]
      }
      this.errMsg = false;
    });
  }

  checkIfUserWorker(user: UserDTO, card: CardDTO): boolean {
    for (let worker of card.workers) {
      if (worker.id === user.id) {
        return true;
      }
    }
    for (let id of card.workers) {
      //@ts-ignore
      if (id === user.id) {
        return true;
      }
    }
    return false;
  }


  changeActiveSection(section: SectionDTO) {
    this.activeSection = section;
    this.storage.writeCurrentSectionToStorage(section.id);
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

  toggleCreateSection(dashboard: DashboardDTO, section: SectionDTO) {
    dashboard.sectionCreate = !dashboard.sectionCreate;
    dashboard.dashboardLeaveFlag = false;
    dashboard.deleteDashboardFlag = false;
    section.deleteSectionFlag = false;
    section.cardCreate = false;
  }

  toggleDeleteDashboard(dashboard: DashboardDTO, section: SectionDTO) {
    dashboard.deleteDashboardFlag = !dashboard.deleteDashboardFlag;
    dashboard.sectionCreate = false;
    dashboard.dashboardLeaveFlag = false;
    section.deleteSectionFlag = false;
    section.cardCreate = false;
  }

  toggleLeaveDashboard(dashboard: DashboardDTO, section: SectionDTO) {
    dashboard.dashboardLeaveFlag = !dashboard.dashboardLeaveFlag;
    dashboard.sectionCreate = false;
    dashboard.deleteDashboardFlag = false;
    section.deleteSectionFlag = false;
    section.cardCreate = false;
  }

  toggleCreateCard(dashboard: DashboardDTO, section: SectionDTO) {
    section.cardCreate = !section.cardCreate;
    dashboard.sectionCreate = false;
    dashboard.dashboardLeaveFlag = false;
    dashboard.deleteDashboardFlag = false;
    section.deleteSectionFlag = false;
  }

  toggleDeleteSection(dashboard: DashboardDTO, section: SectionDTO) {
    section.deleteSectionFlag = !section.deleteSectionFlag;
    dashboard.sectionCreate = false;
    dashboard.dashboardLeaveFlag = false;
    dashboard.deleteDashboardFlag = false;
    section.cardCreate = false;
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
      this.sectionService.addCard(sectionid, title, desc, due).subscribe(data => { }, err => {
        if (err.status === 405) {
          this.toastr.success("Please fill up all field");
        } else if (err.status === 201) {
          this.toastr.success('Card ' + title + " added");
          window.location.reload();
        }
      });

    }



  }

  deleteDashboard(id: string) {
    this.userService.deleteDashboard(id).subscribe(data => { });
    window.location.replace("/");
    this.toastr.error('Dashboard deleted');
  }

  deleteSection(section: SectionDTO) {
    this.dashboardService.deleteSection(section.id).subscribe(data => { });
    window.location.reload();
    this.toastr.error('Section ' + section.title + " removed");
  }

  addUserToCard(user: UserDTO, card: CardDTO) {
    this.cardService.addUserToCard(user, card).subscribe(data => { }, err => {
      if (err.status === 201) {
        window.location.reload();
      } else if (err.status === 409) {
        this.toastr.error("You are already member of this card");
      }
    });
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

  deleteCard(section: SectionDTO, card: CardDTO) {
    this.sectionService.deleteCard(section, card).subscribe(data => { }, err => {
      window.location.reload();
    });
  }

  getCurrentActiveSection(): SectionDTO {
    var sectionId = this.storage.getCurrentSection();
    for (let section of this.dashboard.sections) {
      if (section.id === sectionId) {
        return section;
      }
    }
  }

  putCurrentSection(sectionId: string) {
    return this.storage.writeCurrentSectionToStorage(sectionId);
  }

  isLoggedIn(): boolean {
    return this.storage.isLoggedIn();
  }


}
