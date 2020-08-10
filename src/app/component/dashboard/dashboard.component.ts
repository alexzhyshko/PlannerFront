import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../shared/dashboard.service";
import { Router } from "@angular/router";
import { DashboardDTO } from "../../shared/DashboardDTO";
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  errMsg: boolean = true;
  dashboard: DashboardDTO;
  id: string;

  constructor(private dashboardService: DashboardService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.id = params['id'];
      });
    this.dashboardService.getDashboardById(this.id).subscribe(data=>{
      this.dashboard = data;
      this.errMsg = false;
    });
  }

  loadSection(id: string){
    var str = '';
    this.route.url.subscribe(data=>{
      str = "/"+data[0]+"/"+data[1];
    });
    console.log(str);
    this.router.navigateByUrl(str+"/section/" + id);
  }

}
