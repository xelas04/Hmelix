import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  private cartService = inject(CartService);
  //массив продуктов в корзине
  readonly items = this.cartService.items;

  totalPrice = computed(() => this.items().reduce((sum, p) => sum + p.price, 0));
}
