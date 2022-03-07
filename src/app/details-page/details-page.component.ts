import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent {
  @Input() selectedCv: any;
  @Input() selectedCvId: any;
  @Output() saveDataEmmit = new EventEmitter();

  constructor() { }

  saveData() {
    this.saveDataEmmit.emit();
  }


}
