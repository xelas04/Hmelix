import { Service, signal, Type } from '@angular/core';

@Service()
export class ModalService {
  // какой компонент показать. null = всё закрыто
  private _component = signal<Type<any> | null>(null);
  readonly component = this._component.asReadonly();

  // open
  open(component: Type<any>) {
    this._component.set(component);
    document.body.style.overflow = 'hidden'; // блокирует скролл
  }

  // close
  close() {
    this._component.set(null);
    document.body.style.overflow = ''; // обратно скролл
  }
}
