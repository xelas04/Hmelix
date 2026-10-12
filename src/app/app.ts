import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Header } from './components/header/header';
import { ModalHost } from './components/modal-host/modal-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, NzMenuModule, Header, ModalHost],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
