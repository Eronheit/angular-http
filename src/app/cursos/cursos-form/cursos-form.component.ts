import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
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
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid) {
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
      console.log('submit');
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    //console.log('onCancel');
  }

}
