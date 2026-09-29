/*
сервис : счетчик корзины в хэдере и создание массива из product, 
чтобы потом вызвать его в сервисе корзины
*/
import { computed, effect, Service, signal } from '@angular/core';
import { Product } from '../components/catalog/product';

const STORAGE_KEY = 'cart_items'; // ключ в localStorage

@Service()
export class CartService {
  // Инициализация: пробуем прочитать из localStorage
  // сигнал, который хранит массив объектов типа Product
  // с начальным значением ( JSON ?? )
  readonly items = signal<Product[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'));

  // переменная, коротоая считает длину массива "в корзине", нужна для передачи в Header
  readonly count = computed(() => this.items().length);

  constructor() {
    // вызывается один раз при создании экземпляра
    // effect: автоматически выполняется при КАЖДОМ изменении items
    // Записывает текущее состояние в localStorage как JSON-строку
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
    });
  }

  // метод для счетчика корзины
  toggle(product: Product) {
    // сравнение по productid — id уникален
    // если продукт есть в корзине
    if (this.items().some((p) => p.productid === product.productid)) {
      // значит убираем = присваивает текущему массиву отфильрованный по айди старый
      this.items.update((list) => list.filter((p) => p.productid !== product.productid));
    } else {
      // тут происходит запись в массив
      this.items.update((list) => [...list, product]); // если продукта нет в корзине
    }
  }

  // проверка?
  isInCart(id: number): boolean {
    return this.items().some((p) => p.productid === id);
  }
}
