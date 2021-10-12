import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
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
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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
    this.alertModalService.showAlertDanger('Erro ao carregar cursos, tente novamente mais tarde.')
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.onRefresh();
  }

}
