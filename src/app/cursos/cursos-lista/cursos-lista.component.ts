import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  bsModalRef!: BsModalRef;

  //cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private cursosService: CursosService,
    private bsModalService: BsModalService
  ) { }

  onRefresh() {
    //this.cursosService.list().subscribe(data => this.cursos = data)
    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(error => {
          console.log(error)
          //this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
  }

  handleError() {
    this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger'
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.'
  }

  ngOnInit(): void {
    this.onRefresh();
  }

}
