// тело запроса регистрации — ТОЧНО как JSON, который ты шлёшь
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  sex: string;
  dateOfBirth: string; // формат 'YYYY-MM-DD'
}

// тело запроса логина
export interface LoginDto {
  email: string;
  password: string;
}

// ответ от бэка
export interface User {
  userId: number; // ← проверь по ответу: userId или user_id?
  name: string;
  email: string;
  sex?: string;
  dateOfBirth?: string;
}
