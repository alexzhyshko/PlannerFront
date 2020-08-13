import { Component, OnInit } from '@angular/core';
import { SectionService } from "../../shared/section.service";
import { Router } from "@angular/router";
import { SectionDTO } from "../../shared/SectionDTO";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  errMsg: boolean = true;
  section: SectionDTO;
  dashboardid: string;
  sectionid: string;


  constructor(private sectionService: SectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.dashboardid = params['dashboardid'];
        this.sectionid = params['sectionid'];
      });


      this.sectionService.getSectionById(this.dashboardid, this.sectionid).subscribe(
      data=>{
        this.section = data;
        this.errMsg = false;
      }
    );

  }

}
