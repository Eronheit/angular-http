import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    /* this.route.params.subscribe(
      (params: any) => {
        const id = params['id']
        console.log('id', id);
        const curso$ = this.cursosService.loadById(id);
        curso$.subscribe(curso => {
          this.updateForm(curso);
        })
      }
    ) */

    /* this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.cursosService.loadById(id))
      )
      .subscribe(curso => this.updateForm(curso)) */

    const curso = this.route.snapshot.data['curso']

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    })
  }

  /* updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  } */

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if(this.form.valid) {

      let msgSuccess = 'Curso criado com sucesso!'
      let msgError = 'Erro ao criar curso!'

      if(this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso!'
      }

      this.cursosService.save(this.form.value).subscribe(
        success => {
          this.alertModalService.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {
          this.alertModalService.showAlertDanger(msgError)
        }
      );

      /* if(this.form.value.id) {
        // update
        this.cursosService.update(this.form.value).subscribe(
          success => {
            console.log('Sucesso');
            this.alertModalService.showAlertSuccess('Curso atualizado com sucesso');
            this.location.back();
          },
          error => {
            console.log(error);
            this.alertModalService.showAlertDanger('Erro ao atualizar curso')
          },
          () => console.log('Update completo')
        )
      }
      else {
        // create
        this.cursosService.create(this.form.value).subscribe(
          success => {
            console.log('Sucesso');
            this.alertModalService.showAlertSuccess('Curso criado com sucesso');
            this.location.back();
          },
          error => {
            console.log(error);
            this.alertModalService.showAlertDanger('Erro ao criar curso')
          },
          () => console.log('Request completo')
        );
      } */

    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    //console.log('onCancel');
  }

}
