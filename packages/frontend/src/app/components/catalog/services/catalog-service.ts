import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ProductsResponse } from '../product';

// помечаем класс как "внедряемый" DI
// он общий для всех компонентов
// в новом Angular @Service() то же самое, что и
// @Injectable + providedIn: 'root' → Angular регистрирует этот
// класс в DI-контейнере как singleton (один экземпляр на всё
// приложение). Любой компонент может его внедрить и получить
// ТОТ ЖЕ объект — поэтому состояние у всех общее
@Service()
export class CatalogService {
  // Приватный сигнал — снаружи менять нельзя, только через методы сервиса
  private http = inject(HttpClient);

  // возвращает результат запроса на бэк с передачей {page}
  getProducts(page: number) {
    return this.http.get<ProductsResponse>(`/api/products?page=${page}&pageSize=12`); //
  }
}
