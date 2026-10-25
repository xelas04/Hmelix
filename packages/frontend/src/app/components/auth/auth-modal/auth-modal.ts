import { Component, inject, signal } from '@angular/core';
import { ModalService } from '../../../services/modal-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-auth-modal',
  styleUrl: './auth-modal.scss',
  templateUrl: './auth-modal.html',
})
export class AuthModal {
  private modalService = inject(ModalService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  mode = signal<'login' | 'register'>('login');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    sex: ['', Validators.required], // 'male' | 'female'
    dateOfBirth: ['', Validators.required], // 'YYYY-MM-DD'
  });

  close() {
    this.modalService.close();
  }

  // общий обработчик submit — зависит от mode
  submit() {
    if (this.mode() === 'login') {
      this.submitLogin();
    } else {
      this.submitRegister();
    }
  }

  submitLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService
      .login({
        email: email!,
        password: password!,
      })
      .subscribe({
        next: () => this.close(),
        error: () => console.error('Ошибка логина'),
      });
  }

  submitRegister() {
    if (this.registerForm.invalid) return;

    const { name, email, password, sex, dateOfBirth } = this.registerForm.value;

    this.authService
      .register({
        name: name!,
        email: email!,
        password: password!,
        sex: sex!,
        dateOfBirth: dateOfBirth!,
      })
      .subscribe({
        next: () => this.close(),
        error: () => console.error('Ошибка регистрации'),
      });
  }
}
