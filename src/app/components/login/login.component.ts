import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth_service: AuthentificationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.value;
  }

  submit(e: any) {
    e.preventDefault();
    let message: string = 'Successfully logged in.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.loginForm.valid) {
      this.auth_service
        .login(this.form.username, this.form.password)
        .subscribe((data: any) => {
          this.router.navigateByUrl('admin');
          this.snackBar.open(message, action, { duration: 5000 });
        });
    } else {
      this.snackBar.open(invalidFormMessage, action, { duration: 5000 });
    }
  }
}
