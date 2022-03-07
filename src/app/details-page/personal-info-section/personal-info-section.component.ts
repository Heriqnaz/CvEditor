import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CvService} from "../../services/cv.service";

@Component({
  selector: 'app-personal-info-section',
  templateUrl: './personal-info-section.component.html',
  styleUrls: ['./personal-info-section.component.scss']
})
export class PersonalInfoSectionComponent implements OnInit {
  @Input() selectedCv: any;
  @Input() selectedCvId: string;
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
    }
    if (changes?.['selectedCvId']?.currentValue && changes?.['selectedCvId']?.previousValue
      && changes?.['selectedCvId']?.currentValue !== changes?.['selectedCvId']?.previousValue) {
      this.editingField = '';
      this.editMode = false;
      this.editingFieldValue = '';
      this.labelsPersonalInfo.forEach((item) => {
          this.disableFormControl(item);
      })
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
    if (!this.formPersonalInfo.controls[field].value) return;
    this.editMode = false;
    this.disableFormControl(field);
    this.saveCv(field);
  }

  cancelChanges(field: string) {
    this.editMode = false;
    this.disableFormControl(field);
    this.setForControl(field, this.editingFieldValue);
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
