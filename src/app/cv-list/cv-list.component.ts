import { Component, OnInit } from '@angular/core';
import {CvService} from "../cv.service";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss']
})
export class CvListComponent implements OnInit {
  public cvList: any;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getCvs().subscribe((res) => {
      this.cvList = res;
      console.log('getCvs', res)
    })
  }

  trackByFn(id: number) {
    return id;
  }

}
