import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getCvs() {
    return this.http.get(`${this.url}/cvs`);
  }

  getCvById(id: number) {
    return this.http.get(`${this.url}/getCvById/${id}`);
  }

  saveCv(cv: any) {
    console.log('service', cv);
    return this.http.post(`${this.url}/saveCv/`, cv, { responseType: 'json' });
  }
}
