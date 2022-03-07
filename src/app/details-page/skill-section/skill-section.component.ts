import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Cv} from "../../models/cv";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SkillService} from "../../services/skill.service";
import {Skill} from "../../models/skill";

@Component({
  selector: 'app-skill-section',
  templateUrl: './skill-section.component.html',
  styleUrls: ['./skill-section.component.scss']
})
export class SkillSectionComponent implements OnInit, OnChanges {
  @Input() selectedCv: Cv;
  @Input() selectedCvId: Cv;
  @Output() saveDataEmmit = new EventEmitter();
  skillSections = ['Backend', 'Frontend', 'Db', 'Mobile'];
  dynamicForm: FormGroup;
  skills: Skill[] | undefined;
  filteredSkills: any;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,private skillService: SkillService) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      skills: new FormArray([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['selectedCv']?.currentValue && this.selectedCv) {
      this.skills = this.selectedCv.skills;
      this.filteredSkills = {};
      this.skillSections.forEach((item) => {
        this.skills && (this.filteredSkills[item] = this.skills.filter((skill) => {
          return skill.section === item;
        }))
      });
    }
    if (changes?.['selectedCvId']?.currentValue && changes?.['selectedCvId']?.previousValue && changes?.['selectedCvId']?.currentValue !== changes?.['selectedCvId']?.previousValue) {
      this.skillsArray.clear();
    }
  }

  get dynamicFormControls() { return this.dynamicForm.controls; }
  get skillsArray() { return this.dynamicFormControls['skills'] as FormArray; }
  get skillFormGroups() { return this.skillsArray.controls as FormGroup[]; }

  addSkill() {
    this.skillsArray.push(
      this.formBuilder.group({
        section: ['', Validators.required],
        name: ['', Validators.required]
      })
    )
  }

  cleanSkill(i: number) {
    this.errorMessage = '';
    this.skillsArray.removeAt(i);
  }
  saveSkill(i: number) {
    this.errorMessage = '';
    if (this.skillFormGroups[i].invalid) {
      return;
    }
    if (this.hasSimilarSkill(i)) {
      this.errorMessage = 'Already has similar skill'
      return;
    }

    const data = {
      ... this.skillFormGroups[i].value,
      cvId: this.selectedCv._id
    }
    this.skillService.saveSkill(data).subscribe((res) => {
      this.cleanSkill(i);
      this.saveDataEmmit.emit()
    })
  }

  private hasSimilarSkill(i: number): boolean {
    if (this.skills?.length) {
      const similarSkill = this.skills.find((skill) => {
        return skill.name === this.skillFormGroups[i].get('name')?.value
          && skill.section === this.skillFormGroups[i].get('section')?.value
      });
      return !!similarSkill;
    }
    return false
  }

  deleteAllSavedSkills() {
    this.skillService.deleteAllSkillsByCvId(this.selectedCv._id).subscribe((res) => {
      this.saveDataEmmit.emit();
    })
  }
  deleteSkill(id: string) {
    this.skillService.deleteSkillById(id).subscribe((res) => {
      this.saveDataEmmit.emit();
    })
  }
  deleteAllSavedSkillsBySection(section: string) {
    this.skillService.deleteAllSavedSkillsBySection(section, this.selectedCv._id).subscribe((res) => {
      this.saveDataEmmit.emit();
    })
  }
}
