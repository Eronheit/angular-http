import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private bsModalService: BsModalService) { }

  private showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string) {
    this.showAlert(message, 'danger');
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, 'success');
  }
}
