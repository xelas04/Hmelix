import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { LoginDto, RegisterDto, UserDto } from './userDto';
import { catchError, of, tap } from 'rxjs';

@Service()
export class AuthService {
  private http = inject(HttpClient);

  // Приватный сигнал — снаружи менять нельзя, только через методы сервиса
  // сигнал: кто сейчас залогинен. null = никто.
  // Держим прямо в сервисе, чтобы Header мог читать.
  private _user = signal<UserDto | null>(null);
  readonly user = this._user.asReadonly();

  // Регистрация: POST /api/user/registration
  register(dto: RegisterDto) {
    return this.http
      .post<UserDto>(`/api/user/registration`, dto, { withCredentials: true })
      .pipe(tap((user) => this._user.set(user)));
  }

  // логин
  login(dto: LoginDto) {
    return this.http
      .post<UserDto>(`/api/user/login`, dto, { withCredentials: true })
      .pipe(tap((user) => this._user.set(user)));
  }

  // проверка сессии при старте
  getMe() {
    return this.http.get<UserDto>(`/api/user/me`, { withCredentials: true }).pipe(
      tap((user) => this._user.set(user)),
      catchError(() => {
        // 401 = не залогинен. Это НЕ ошибка — просто null
        this._user.set(null);
        return of(null); // ← заменяем ошибку на "пустое" значение
      }),
    );
  }
}
