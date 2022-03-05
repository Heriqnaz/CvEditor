import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private url = 'http://localhost:3000/api/skill'

  constructor(private http: HttpClient) { }

  getSkillsByCvId(cvId: string) {
    return this.http.get(`${this.url}/skillsByCvId/${cvId}`);
  }

  deleteSkillById(id: string) {
    return this.http.get(`${this.url}/deleteSkillById/${id}`);
  }

  saveSkill(skill: any) {
    return this.http.post(`${this.url}/saveSkill/`, skill, { responseType: 'json' });
  }
}
