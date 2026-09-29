import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { sum } from 'ng-zorro-antd/core/util';

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

  /* читаем текущий массив товаров из сигнала
  
  */
  totalPrice = computed(() => this.items().reduce((sum, p) => sum + p.price, 0));
}
