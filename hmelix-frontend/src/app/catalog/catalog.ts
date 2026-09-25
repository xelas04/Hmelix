import { Component, inject, signal, forwardRef, computed } from '@angular/core';
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
  cartIds = signal<number[]>([]);

  readonly totalLabel = computed(() => {
  const n = this.totalCount();
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${n} анализов`;
  const mod10 = n % 10;
  if (mod10 === 1) return `${n} анализ`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} анализа`;
  return `${n} анализов`;

});

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
  
toggle(id: number) { // переключатель для кнопки 'В корзину'
if (this.cartIds().includes(id)) {
  // товар уже в корзине? - убираем его
  this.cartIds.set(this.cartIds().filter(x => x !== id));
  } else {
  // товара нет в корзине? добавляем в конец
  this.cartIds.set([...this.cartIds(), id]);
  }
}
// проверка для шаблона
isInCart(id: number): boolean {
  return this.cartIds().includes(id);
}

}

