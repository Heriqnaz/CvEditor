import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Cv} from "../../models/cv";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobService} from "../../services/job.service";
import {Job} from "../../models/job";

@Component({
  selector: 'app-job-section',
  templateUrl: './job-section.component.html',
  styleUrls: ['./job-section.component.scss']
})
export class JobSectionComponent implements OnInit, OnChanges {
  @Input() selectedCv: Cv;
  @Output() saveDataEmmit = new EventEmitter();
  dynamicJobForm: FormGroup;
  jobs: Job[] | undefined;
  editedJobId: string;

  constructor(private formBuilder: FormBuilder,private jobService: JobService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['selectedCv']?.currentValue && this.selectedCv) {
      this.jobs = this.selectedCv.jobs;
    }
  }

  ngOnInit(): void {
    this.dynamicJobForm = this.formBuilder.group({
      jobs: new FormArray([])
    });
  }

  get dynamicFormControls() { return this.dynamicJobForm.controls; }
  get jobsArray() { return this.dynamicFormControls['jobs'] as FormArray; }
  get jobFormGroups() { return this.jobsArray.controls as FormGroup[]; }

  addHistory() {
    this.jobsArray.push(
      this.formBuilder.group({
        title: ['', Validators.required],
        role: ['', Validators.required],
        timeRange: this.formBuilder.group({
          start: ['', Validators.required],
          end: ['', Validators.required]
        }),
        details: ['']
      })
    )

  }

  saveJob(i: number) {
    const formValue = this.jobFormGroups[i].value;
    const start = this.jobFormGroups[i].get('timeRange')?.get('start')?.value.toString()
    const end = this.jobFormGroups[i].get('timeRange')?.get('end')?.value.toString()
    delete formValue['timeRange'];
    const data = {
      ...this.jobFormGroups[i].value,
      end,
      start,
      cvId: this.selectedCv._id
    };
    if (this.editedJobId) {
      this.jobService.editJob(this.editedJobId, data).subscribe(() => {
        this.editedJobId = '';
        this.saveDataEmmit.emit();
        this.cleanJob(i);
      })
    } else {
      this.jobService.saveJob(data).subscribe((res) => {
        this.editedJobId = '';
        this.saveDataEmmit.emit();
        this.cleanJob(i);
      })
    }
  }

  cleanJob(i: number) {
    this.editedJobId = '';
    this.jobsArray.removeAt(i);
  }

  editJob(job: Job) {
    this.editedJobId = job._id;
    this.jobsArray.push(
      this.formBuilder.group({
        title: [job.title, Validators.required],
        role: [job.role, Validators.required],
        timeRange: this.formBuilder.group({
          start: [job.start && new Date(job.start), Validators.required],
          end: [job.end && new Date(job.end), Validators.required]
        }),
        details: [job.details]
      })
    )
  }
  deleteJob(id: string) {
    this.jobService.deleteJobById(id).subscribe((res) => {
      this.saveDataEmmit.emit();
    })

  }

}
