import { Component, inject, signal, forwardRef, computed } from '@angular/core';
import { CatalogService } from './services/catalog-service';
import { Product } from './product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-catalog',
  styleUrl: './catalog.scss',
  templateUrl: './catalog.html',
})

export class Catalog {
  // ВНЕДРЕНИЕ ЗАВИСИМОСТИ (DI) : inject(catalogService)
  // отдаёт экземпляр catalogService
  private catalogService = inject(CatalogService);
  private cartService = inject(CartService);
  // сигналы
  products = signal<Product[]>([]); // накопитель
  totalCount = signal(0);
  loading = signal(true);
  error = signal<string | null>(null);
  page = signal(1);


  // метод - отображение totalCount
  readonly totalLabel = computed(() => {
  const n = this.totalCount();
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${n} анализов`;
  const mod10 = n % 10;
  if (mod10 === 1) return `${n} анализ`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} анализа`;
  return `${n} анализов`;
  });


  /* 
  constructor вызывается при создании экземпляра Component, 
  а Component создаётся при первом заходе на url
  */
  constructor() { 
    this.loadMore();
  }

  // метод отображения "Показать ещё"
  loadMore(){
    this.catalogService.getProducts(this.page()).subscribe({ // вызывает метод из сервиса и подписывается на данные
      next: (data) => { // наполняем сигналы:
        this.products.update(old => [...old, ...data.products]); // старые + новые (накопление)
        this.totalCount.set(data.totalCount);
        this.loading.set(false);
        this.page.update(p => p + 1); // следующая страница
      },
      error: (err) => {
        this.error.set('Ошибка загрузки');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  // сигнал, которыый сравнивает, сколько уже загружено (products().length) и сколько всего есть (totalCount)
  // отдаёт true или false
  hasMore = computed(() => this.products().length < this.totalCount());

  // переключатель - вызывается из сервиса
  toggle(product: Product) {
    this.cartService.toggle(product);
  }
  // для html проверяем по айди
  isInCart(id: number): boolean {
    return this.cartService.isInCart(id);
  }

}
