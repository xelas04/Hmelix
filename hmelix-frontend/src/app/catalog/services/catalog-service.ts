import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '../product';

// помечаем класс как "внедряемый"
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);

  // запрос на бэк с передачей page
  getProducts(page: number) { 
    return this.http.get<ProductsResponse>(`/api/products?page=${page}&pageSize=12`); // 
  }
}
