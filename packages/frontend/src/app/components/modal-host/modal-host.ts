import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal-service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  imports: [NgComponentOutlet],
  selector: 'app-modal-host',
  styleUrl: './modal-host.scss',
  templateUrl: './modal-host.html',
})
// хост слушает ModalService и реагирует рендером через ngComponentOutlet
export class ModalHost {
  modalService = inject(ModalService);

  // при нажатии вне модалки = закрытие
  onBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('backdrop')) {
      this.modalService.close();
    }
  }
}
