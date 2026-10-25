import { Component, inject, signal } from '@angular/core';
import { PopularService } from './services/popular-service';
import { Product } from '../catalog/product';
// import { isInCart } from '../../../app/services/cart-service';
import { CartService } from '../../../app/services/cart-service';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  // ВНЕДРЕНИЕ ЗАВИСИМОСТИ (DI) : inject(catalogService)
  // отдаёт экземпляр catalogService
  private popularService = inject(PopularService);
  private cartService = inject(CartService);
  // сигналы
  popular = signal<Product[]>([]); // накопитель
  loading = signal(true);
  error = signal<string | null>(null);
  page = signal(1);

  /* 
  constructor вызывается при создании экземпляра Component, 
  а Component создаётся при первом заходе на url
  */
  constructor() {
    this.load();
  }

  load() {
    this.popularService.getPopular(this.page()).subscribe({
      next: (data) => {
        this.popular.update((old) => [...old, ...data.popular]);
        this.loading.set(false);
        this.page.update((p) => p + 1);
      },
      error: (err) => {
        this.error.set('Ошибка загрузки');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  // переключатель - вызывается из сервиса
  toggle(product: Product) {
    this.cartService.toggle(product);
  }

  // для html проверяем по айди
  isInCart(id: number): boolean {
    return this.cartService.isInCart(id);
  }
}
