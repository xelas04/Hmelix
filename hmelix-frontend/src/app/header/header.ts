import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  imports: [RouterLink, RouterLinkActive, NzBreadCrumbModule],
  selector: 'app-header',
  
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {}
