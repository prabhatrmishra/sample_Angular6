import { Injectable } from '@angular/core';
import { kit } from 'src/app/app.const';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  options = {
    pos: 'top-right',
    timeout: 1500
  }

  constructor() { }

  success(message: string) {
    kit.notification({
      message,
      ...this.options,
      status: 'success'
    })
  }

  danger(message: string, error?: string) {
    kit.notification({
      ...this.options,
      message: this.renderDanger(message, error),
      status: 'danger'
    })
  }

  private renderDanger = (message, error?) => `<p>${message}</p> <small class="ce-color-danger"> ${error ? `If interested: ${error}` : ``}</small>`;
}
