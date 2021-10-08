import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AlertModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent
  ]
})
export class SharedModule { }
