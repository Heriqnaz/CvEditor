import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private url = 'http://localhost:3000/api/skill'

  constructor(private http: HttpClient) { }

  getSkillsByCvId(cvId: string) {
    return this.http.get(`${this.url}/skillsByCvId/${cvId}`);
  }

  deleteSkillById(id: string) {
    return this.http.delete(`${this.url}/deleteSkillById/${id}`);
  }
  deleteAllSkillsByCvId(cvId: string) {
    return this.http.delete(`${this.url}/deleteAllSkillsByCvId/${cvId}`);
  }
  deleteAllSavedSkillsBySection(section: string, cvId: string) {
    return this.http.delete(`${this.url}/deleteAllSavedSkillsBySection/${section}/${cvId}`);
  }

  saveSkill(skill: any) {
    return this.http.post(`${this.url}/saveSkill/`, skill, { responseType: 'json' });
  }
}
