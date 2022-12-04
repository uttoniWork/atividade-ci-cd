import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { empty } from 'rxjs';
import { Imc } from './models/imc';
import { ImcService } from './services/imc.service';

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

  imc_ = {} as Imc;
  cars: Imc[];

  constructor(private imcService: ImcService) {}

  // defini se um carro será criado ou atualizado
  saveCar(form: NgForm) {
    this.imcService.saveImc(this.imc_).subscribe(() => {
      this.cleanForm(form);
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.imc_ = {} as Imc;
  }

  entradaDados(altura: any, peso: any): number {
    this.imc = parseFloat((peso/(altura*altura)).toFixed(2));
    this.imc_ = {altura: parseFloat(altura), peso: parseFloat(peso), imc: this.imc};
    this.imcService.saveImc(this.imc_).subscribe();
    // console.log(typeof(this.imc_.peso));
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
