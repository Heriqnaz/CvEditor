import { Component, OnInit } from '@angular/core';
import {CvService} from "../services/cv.service";
import {Cv} from "../models/cv";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss']
})
export class CvListComponent implements OnInit {
  public cvList: any;
  public selectedCvId = '';
  public selectedCv: Cv;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getCvs().subscribe((res: any) => {
      if (res?.length) {
        this.selectedCvId = res[0]._id;
        this.getSelectedCvData();
        this.cvList = res;
      }
    });
  }
  trackByFn(id: number) {
    return id;
  }

  onClickListItem(id: string) {
    this.selectedCvId = id;
    this.getSelectedCvData();
  }

  getSelectedCvData() {
    this.cvService.getCvById(this.selectedCvId).subscribe((cv: any) => {
      this.selectedCv = cv;
    }, error => {
      console.log('err', error)
    });
  }

  saveData() {
       this.getSelectedCvData();
  }

}
