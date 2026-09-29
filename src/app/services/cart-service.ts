/*
сервис : счетчик корзины в хэдере и создание массива из product, 
чтобы потом вызвать его в сервисе корзины
*/
import { computed, Service, signal } from '@angular/core';
import { Product } from '../components/catalog/product';

@Service()
export class CartService {
  // массив продуков чтобы на странице корзины не делать запросов
  readonly items = signal<Product[]>([]);

  // переменная, коротоая считает длину массива "в корзине", нужна для передачи в Header
  readonly count = computed(() => this.items().length);

  // метод для счетчика корзины
  toggle(product: Product) {
    // переключатель для кнопки 'В корзину'
    // сравнение по productid — id уникален
    if (this.items().some((p) => p.productid === product.productid)) {
      this.items.update((list) => list.filter((p) => p.productid !== product.productid));
    } else {
      this.items.update((list) => [...list, product]);
    }
  }

  // проверка?
  isInCart(id: number): boolean {
    return this.items().some((p) => p.productid === id);
  }
}
