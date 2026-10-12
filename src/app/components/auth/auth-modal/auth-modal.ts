import { Component, inject, signal } from '@angular/core';
import { ModalService } from '../../../services/modal-service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-auth-modal',
  styleUrl: './auth-modal.scss',
  templateUrl: './auth-modal.html',
})
export class AuthModal {
  private modalService = inject(ModalService);
  //private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  mode = signal<'login' | 'register'>('login');

  form = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  close() {
    this.modalService.close();
  }

  // submit() {
  //   if (this.form.invalid) return;
  //   const { name, email, password } = this.form.value;

  //   if (this.mode() === 'login') {
  //     this.authService.login(email!, password!).subscribe(() => this.close());
  //   } else {
  //     this.authService.register(name!, email!, password!).subscribe(() => this.close());
  //   }
  // }
}
