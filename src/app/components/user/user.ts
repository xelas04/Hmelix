import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  imports: [],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})
export class User {
  authService = inject(AuthService);
}
