import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Auth from '../../services/auth';
import { Credentials } from '../../models/credentials';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  showError = signal(false);
  submitting = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private router: Router,
    private auth: Auth,
  ) {}

  onSubmit() {
    if (this.loginForm.invalid || this.submitting()) {
      return;
    }

    this.showError.set(false);
    this.submitting.set(true);

    const email = this.loginForm.value.email!!;
    const password = this.loginForm.value.password!!;

    const credentials = new Credentials(email, password);
    this.auth.login(credentials).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.submitting.set(false);
        this.showError.set(true);
      },
    });
  }
}
