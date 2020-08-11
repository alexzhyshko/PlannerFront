import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/user.service";
import { StorageService } from "../../shared/storage.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.component.html',
  styleUrls: ['./add-dashboard.component.css']
})
export class AddDashboardComponent implements OnInit {

  createForm: FormGroup;
  joinForm: FormGroup;


  constructor(private storage: StorageService,
    private userService: UserService,
    private router: Router) { }


  ngOnInit(): void {

    this.createForm = new FormGroup({
      title: new FormControl('', Validators.min(1))
    });

    this.joinForm = new FormGroup({
      id: new FormControl('', Validators.min(1))
    });

  }

  joinDashboard() {
    var id = this.joinForm.get('id').value;
    if (id.trim() !== '') {
      this.userService.joinDashboard(id, this.storage.getUsername()).subscribe(data => { });
      window.location.replace(window.location.origin + "/");
      //this.router.navigateByUrl('/');
    }
  }

  createDashboard() {
    var title = this.createForm.get('title').value;
    if (title.trim() !== '') {
      this.userService.createDashboard(title, this.storage.getUsername()).subscribe(data => { });
      window.location.replace(window.location.origin + "/");
      //this.router.navigateByUrl('/');
    }
  }

}
