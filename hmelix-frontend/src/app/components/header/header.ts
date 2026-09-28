import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [RouterLink, RouterLinkActive, NzBreadCrumbModule],
  selector: 'app-header',
  
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  // ВНЕДРЕНИЕ ЗАВИСИМОСТИ (DI)
  // Тот же CartService, что и в Catalog - singleton.
  // Меняется в одном компоненте → видно в другом.
  private cartService = inject(CartService);

  // читает счётчик
  readonly cartCount = this.cartService.count;
}
