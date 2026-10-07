import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  private cartService = inject(CartService);
  //массив продуктов в корзине
  readonly items = this.cartService.items;

  // метод - отображение orderCount
  public readonly totalLabel = computed(() => {
    const n = this.items().length;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return `${n} анализов`;
    const mod10 = n % 10;
    if (mod10 === 1) return `${n} анализ`;
    if (mod10 >= 2 && mod10 <= 4) return `${n} анализа`;
    return `${n} анализов`;
  });

  // метод для удаления каждого продукта в корзине
  remove(id: number) {
    this.cartService.remove(id);
  }

  totalPrice = computed(() => this.items().reduce((sum, p) => sum + p.price, 0));
}
