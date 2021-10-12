import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private cursosService: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Curso> | Observable<any> {

    if(route.params && route.params['id']) {
      return this.cursosService.loadById(route.params['id']);
    }

    return of({
     id: null,
     nome: null
    });
  }
}
