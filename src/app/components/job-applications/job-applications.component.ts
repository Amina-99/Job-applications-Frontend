import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { JobApplication } from 'src/app/models/JobApplication';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css'],
})
export class JobApplicationsComponent implements OnInit {
  public applications: any;
  constructor(
    private _jobApplicationService: JobApplicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this._jobApplicationService
      .getJobApplications()
      .subscribe((data: JobApplication[]) => {
        this.applications = data;
      });
  }
  viewCV(id: number) {
    this._jobApplicationService.downloadCV(id).subscribe((result: Blob) => {
      var blob = new Blob([result], { type: 'APPLICATION/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  exportJSON(application: JobApplication) {
    var blob = new Blob([JSON.stringify(application)], {
      type: 'APPLICATION/JSON',
    });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = 'applicationExport';
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  delete(id: number) {
    let message: string = 'Successfully deleted application.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Something went wrong.';
    this._jobApplicationService.deleteApplication(id).subscribe(
      (data) => {
        this.snackBar.open(message, action, { duration: 5000 });
        this.getApplications();
      },
      (error) => {
        this.snackBar.open(invalidFormMessage, action, { duration: 5000 });
      }
    );
  }
}
