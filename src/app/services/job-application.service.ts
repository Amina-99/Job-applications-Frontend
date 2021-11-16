import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobApplication } from '../models/JobApplication';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getJobApplications(): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'api/job-application');
  }

  sendJobApplication(application: any) {
    return this.httpClient.post(
      this.apiUrl + 'api/job-application/apply',
      application
    );
  }

  downloadCV(id: number) {
    return this.httpClient.get(this.apiUrl + 'api/job-application/cv/' + id, {
      responseType: 'blob',
    });
  }

  deleteApplication(id: number) {
    return this.httpClient.put(this.apiUrl + 'api/job-application/' + id, {});
  }
}
