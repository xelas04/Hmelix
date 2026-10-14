import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { LoginDto, RegisterDto } from './user';
import { User } from '../../components/user/user';
import { tap } from 'rxjs';

@Service()
export class AuthService {
  // Приватный сигнал — снаружи менять нельзя, только через методы сервиса
  private http = inject(HttpClient);

  // сигнал: кто сейчас залогинен. null = никто.
  // Держим прямо в сервисе, чтобы Header мог читать.
  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  // Регистрация: POST /api/user/registration
  register(dto: RegisterDto) {
    return this.http
      .post<User>(`/api/user/registration`, dto, { withCredentials: true })
      .pipe(tap((user) => this._user.set(user)));
  }

  // логин
  login(dto: LoginDto) {
    return this.http
      .post<User>(`/api/user/login`, dto, { withCredentials: true })
      .pipe(tap((user) => this._user.set(user)));
  }

  // проверка сессии при старте
  getMe() {
    return this.http.get<User>(`/api/user/me`, { withCredentials: true }).pipe(
      tap({
        next: (user) => this._user.set(user),
        error: () => this._user.set(null), // 401 = не залогинен, это ок
      }),
    );
  }
}
