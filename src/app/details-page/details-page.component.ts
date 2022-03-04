import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CvService} from "../cv.service";
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
  labelsPersonalInfo = ['name', 'lastName', 'email', 'phoneNumber', 'bDay'];
  editMode = false;
  editingField = '';
  editingFieldValue: any;

  formPersonalInfo = new FormGroup({
    name: new FormControl({value: '', disabled: true}),
    lastName: new FormControl({value: '', disabled: true}),
    bDay: new FormControl({value: '', disabled: true}),
    phoneNumber: new FormControl({value: '', disabled: true}),
    email: new FormControl({value: '', disabled: true}),
    skills: new FormControl([]),
    job: new FormControl([])
  });

  constructor(private cvService: CvService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['selectedCv']?.currentValue) {
      this.labelsPersonalInfo.forEach((label) => {
        if (this.selectedCv.hasOwnProperty(label)) {
          this.formPersonalInfo.controls[label].setValue(this.selectedCv[label]);
        } else {
          this.formPersonalInfo.controls[label].setValue('');
        }
      })
      console.log('cvvvvvvvvvvvvvvvvvvvvv', this.selectedCv)
    }
  }

  ngOnInit(): void {
  }

  saveCv(field: string) {
    const filter = {
      id: this.selectedCv['_id'],
      data: {}
    };
    // @ts-ignore
    filter.data[field] = this.formPersonalInfo.controls[field].value;
    this.cvService.saveCv(filter).subscribe((res) => {
        if (field === 'name') {
          this.saveDataEmmit.emit()
        }
        console.log('ddddddddd', res);
    })
  }

  editField(field: string) {
    this.editingField = field;
    this.editMode = true;
    this.editingFieldValue = this.formPersonalInfo.controls[field].value;
    this.enableFormControl(field);
    this.labelsPersonalInfo.forEach((item) => {
      if (item !== field) {
        this.disableFormControl(item);
      }
    })
  }

  saveChanges(field: string) {
    this.editMode = false;
    this.disableFormControl(field);
    this.saveCv(field);
  }

  cancelChanges(field: string) {
    this.editMode = false;
    this.disableFormControl(field);
    this.setForControl(field, this.editingFieldValue);
    console.log('ggggggggggggggggg', this.formPersonalInfo.controls[field].value);
  }
  setForControl(name: string, value: any) {
    this.formPersonalInfo.controls[name].setValue(value);
  }

  disableFormControl(name: string) {
    if(!this.formPersonalInfo.controls[name].disabled){
      this.formPersonalInfo.controls[name].disable()
    }
  }
  enableFormControl(name: string) {
    if(!this.formPersonalInfo.controls[name].enabled){
      this.formPersonalInfo.controls[name].enable()
    }
  }

}
