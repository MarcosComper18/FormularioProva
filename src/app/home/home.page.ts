import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { startWith, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  public equipes = [
    'Mclaren','Ferrari','Red bull', 'Alpine','Alpha tauri',
    'Mercedes','Williams'

  ]

  public showPassword = false;

  public formulario: FormGroup;

  constructor(private fb:FormBuilder) {
    this.formulario = fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3), naoPodeSerBughiValidator()])],
      sobrenome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      equipe: [''],
      fruta: ['',Validators.required],
      genero: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cep: ['', Validators.compose([Validators.required, Validators.minLength(3)])],

    });

    this.formulario.get('equipe')
    .valueChanges
    .pipe(startWith(null),pairwise())
    .subscribe(([ anterior, atual]: [any, any]) => {
      console.log(anterior, atual);
    })
  }

  ngOnInit() {
    let dado = {
      nome: "",
      sobrenome: "",
      cpf: "",
      enderecoCompleto: "",
      equipe: "Mercedes",
      fruta: 'strawberries',
      genero: '',
    };
    //this.formulario.controls.nome.disable();

    this.formulario.patchValue(dado, {emitEvent: true});
  }

  enviar() {
    console.log(this.formulario.value);
    if (!this.formulario.valid) {
        this.formulario.markAllAsTouched();
    }
  }

  exibeodigite() {
    if (this.showPassword) {
      this.showPassword =  !this.showPassword;
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  teste() {
    this.toggleShow();
  }

}

export function naoPodeSerBughiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let nome = control.value;
    return nome.toUpperCase() === 'BUGHI' ? {naoPodeSerBughi: true} : null;
  };
}

