import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private url = 'http://localhost:3000/api/cv'

  constructor(private http: HttpClient) { }

  getCvs() {
    return this.http.get(`${this.url}/cvs`);
  }

  getCvById(id: string) {
    return this.http.get(`${this.url}/getCvById/${id}`);
  }

  saveCv(cv: any) {
    return this.http.post(`${this.url}/saveCv/`, cv, { responseType: 'json' });
  }
}
