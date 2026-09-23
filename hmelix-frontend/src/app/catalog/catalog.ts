import { Component, inject, signal } from '@angular/core';
import { CatalogService } from './services/catalog-service';
import { Product } from './product';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-catalog',
  styleUrl: './catalog.scss',
  templateUrl: './catalog.html',
})
export class Catalog {
  private catalogService = inject(CatalogService);

  // сигналы
  products = signal<Product[]>([]);
  totalCount = signal(0);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() { // метод - конструктор, 
    this.catalogService.getProducts().subscribe({ // вызывает сервис и подписывается на данные
      next: (data) => { // наполняем сигналы:
        this.products.set(data.products);
        this.totalCount.set(data.totalCount);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Ошибка загрузки');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

}
