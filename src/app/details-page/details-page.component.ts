import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CvService} from "../services/cv.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cv} from "../models/cv";
import {Job} from "../models/job";
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, OnChanges {
  @Input() selectedCv: any;
  @Output() saveDataEmmit = new EventEmitter();

  constructor(private cvService: CvService) { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
  }

  saveData() {
    this.saveDataEmmit.emit();
  }


}
