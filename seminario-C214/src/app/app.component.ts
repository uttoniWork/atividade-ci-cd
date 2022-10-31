import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  altura: number;
  peso: number;
  imc: number;
  resposta: string;

  constructor() {}

  entradaDados(altura: number, peso: number): number {

    this.imc = parseFloat((peso/(altura*altura)).toFixed(2));
    this.limpaCampos();

    if(this.imc < 18.5){
      this.resposta = 'Abaixo do peso!';
      return this.imc;
    }
    else if(this.imc >= 18.5 && this.imc <= 24.9) {
      this.resposta = 'Peso normal!';
      return this.imc;
    }
    else if(this.imc >= 25.0 && this.imc <= 29.9) {
      this.resposta = 'Excesso de peso!';
      return this.imc;
    }
    else if(this.imc >= 30.0 && this.imc <= 34.9) {
      this.resposta = 'Obesidade classe I!';
      return this.imc;
    }
    else if(this.imc >= 35.0 && this.imc <= 39.9) {
      this.resposta = 'Obesidade classe II!';
      return this.imc;
    }
    else if(this.imc >= 40.0) {
      this.resposta = 'Obesidade classe III!';
      return this.imc;
    }
    return 0;
  }

  confereDados(altura: number, peso: number): any {
    if(altura < 0 || peso < 0 || altura < 1.40 || peso < 40){
      throw new Error("Altura e peso não podem ser 0, altura deve ser superior a 1.40cm e peso superior a 40kg");
    }
    return this.entradaDados(altura, peso);
  }

  limpaCampos() {
    this.altura = 0;
    this.peso = 0;
  }

}
