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
      this.selectedCvId = res[0]._id;
      this.getSelectedCvData();
      this.cvList = res;
    }, error => {
      console.log('getCvsError', error);
    })
  }

  getCvsList() {
    this.cvService.getCvs().subscribe((res: any) => {
      this.getSelectedCvData();
      this.cvList = res;
    }, error => {
      console.log('getCvsError', error);
    })
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
      console.log('dddddddddddddddddd', cv)
      this.selectedCv = cv;
    }, error => {
      console.log('err', error)
    });
  }

  saveData() {
       this.getCvsList();
  }

}
