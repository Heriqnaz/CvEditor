import { Component, OnInit } from '@angular/core';
import {CvService} from "../cv.service";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.saveCv({name: 'Her', last: 'Sim'}).subscribe({
      next(res) {
        console.log('ddddddddd', res);
      },
      error(msg) {
        console.log('Error Getting: ', msg);
      }
    })
  }

}
