import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Job} from "../models/job";

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private url = 'http://localhost:3000/api/job'

  constructor(private http: HttpClient) { }

  jobsByCvId(cvId: string) {
    return this.http.get(`${this.url}/jobsByCvId/${cvId}`);
  }

  deleteJobById(id: string) {
    return this.http.get(`${this.url}/deleteJobById/${id}`);
  }

  saveJob(job: Job) {
    return this.http.post(`${this.url}/saveJob/`, job, { responseType: 'json' });
  }
  editJob(id: string, job: Job) {
    const filter = {
      _id: id,
      data: job
    }
    return this.http.put(`${this.url}/editJob/`, filter, { responseType: 'json' });
  }
}
