import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PopularResponse } from '../../catalog/product';

@Service()
export class PopularService {
  // Приватный сигнал — снаружи менять нельзя, только через методы сервиса
  private http = inject(HttpClient);

  // возвращает результат запроса на бэк с передачей {page}
  getPopular(page: number) {
    return this.http.get<PopularResponse>(`/api/products/popular?page=${page}&pageSize=4`);
  }
}
