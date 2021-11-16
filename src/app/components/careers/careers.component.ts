import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
})
export class CareersComponent implements OnInit {
  applicationForm!: FormGroup;
  fileToUpload: any;

  constructor(
    private fb: FormBuilder,
    private _jobApplicationService: JobApplicationService
  ) {}

  ngOnInit() {
    this.applicationForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[-s./0-9]*'),
      ]),
    });
  }

  get field() {
    return this.applicationForm.controls;
  }

  getErrorMessageEmail() {
    if (this.field.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.field.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePhone() {
    if (this.field.phone.hasError('required')) {
      return 'This field is required';
    }
    return this.field.phone.hasError('pattern')
      ? 'Not a valid phone number, only numbers are allowed'
      : '';
  }

  handleFileInput(e: any) {
    this.fileToUpload = e?.target?.files[0];
  }

  sendApplication() {
    const formData: FormData = new FormData();
    formData.append('CV', this.fileToUpload);
    formData.append('firstName', this.field.firstName.value);
    formData.append('lastName', this.field.lastName.value);
    formData.append('email', this.field.email.value);
    formData.append('phone', this.field.phone.value);
    this._jobApplicationService
      .sendJobApplication(formData)
      .subscribe((_) => {});
  }
}
